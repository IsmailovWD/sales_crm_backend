import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseService } from '../base.service';
import { DealCreateDto, OrdersDto } from './dto/deal-create.dto';
import { ContactsService } from '../contacts/contacts.service';
import { Server } from 'socket.io';
import { Deal } from './entities/deal.entity';
import { In } from 'typeorm';
import { DealUpdateDto } from './dto/deal-update.dto';
import { DealActivityService } from '../deal-activity/deal-activity.service';
import { User } from '../users/entities/user.entity';
import { DealActivityType } from '../deal-activity/entities/deal-activity.entity';
import { DealStageService } from '../deal-stage/dealStage.service';
import { DatabaseService } from '../../libs/database/database.service';
import { UsersService } from '../users/users.service';
import { DeliveryManService } from '../deliveryMan/deliveryMan.service';
import { DealOrdersService } from '../deal-orders/deal-orders.service';

@Injectable()
export class DealService extends BaseService<Deal> {
  private crmSocketServer?: Server;
  // private getRepo(): Repository<Deal>;
  // private orderRepo: Repository<DealOrders>;

  constructor(
    protected readonly databaseService: DatabaseService,
    private readonly contactService: ContactsService,
    private readonly activityService: DealActivityService,
    @Inject(forwardRef(() => DealStageService))
    private readonly dealStageService: DealStageService,
    private readonly usersService: UsersService,
    private readonly deliveryManService: DeliveryManService,
    private readonly dealOrdersService: DealOrdersService,
  ) {
    super(databaseService, Deal);
  }

  setSocketServer(server: Server) {
    this.crmSocketServer = server;
  }

  async getAll(size: number, stage: number) {
    return this.getRepo().find({
      where: { stage: { id: stage } },
      relations: ['contact'],
      skip: size,
      take: 20,
      order: { createdAt: 'DESC' },
    });
  }

  async getById(id: number) {
    return this.getRepo().findOne({
      where: { id },
      relations: ['contact', 'orders', 'region', 'district'],
    });
  }

  async create(dto: DealCreateDto, user: User) {
    try {
      const { model: contact } = await this.contactService.findOrCreate(
        dto.contact,
      );
      const savedDeal = await this.getRepo().save({
        ...dto,
        contact,
        title: dto.title ?? undefined,
      });

      await this.dealOrdersService.addOrders(savedDeal, dto.orders);
      this.emitSocket('add-deal', savedDeal, savedDeal.stage.id);

      await this.activityService.createActivity(
        {
          deal_id: savedDeal.id,
          type: DealActivityType.ACTION,
          is_pin: false,
          metadata: { action: 'create' },
        },
        user.id,
      );

      return savedDeal;
    } catch (e) {
      throw new HttpException(
        e?.message ?? 'Error creating deal',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(dto: DealUpdateDto, id: number, user_id: number) {
    const document = await this.getRepo().findOne({
      where: { id },
      relations: ['contact'],
    });

    if (!document)
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);

    const { model: contact } = await this.contactService.findOrCreate(
      dto.contact,
    );
    const changes = await this.detectChanges(document, dto, contact);

    const old_stage_id = document.stage_id;
    Object.assign(document, {
      ...dto,
      contact,
      stage_id: dto.stage_id,
      tags: dto.tags ?? [],
    });

    await this.getRepo().save(document);
    await this.dealOrdersService.addOrders(document, dto.orders, true);
    await this.handleStageChange(old_stage_id, dto.stage_id, document, user_id);

    if (changes.length) {
      await this.activityService.createActivity(
        {
          deal_id: document.id,
          type: DealActivityType.EDIT,
          is_pin: false,
          metadata: changes,
        },
        user_id,
      );
    }

    return document;
  }

  async changeStageByIds(
    ids: number[],
    stage_id: number,
    old_stage_id: number,
    user_id: number,
  ) {
    await this.getRepo().update({ id: In(ids) }, { stage_id });

    const [fromStage, toStage] = await this.dealStageService.getStageNames([
      old_stage_id,
      stage_id,
    ]);

    const activities = ids.map((id) => ({
      deal_id: id,
      is_pin: false,
      type: DealActivityType.STAGE_CHANGE,
      metadata: { from_stage: fromStage, to_stage: toStage },
    }));

    await this.activityService.createActivity(activities, user_id);
    return 'ok';
  }

  private async detectChanges(
    old: Deal,
    updated: Partial<Deal | DealCreateDto | DealUpdateDto>,
    contact: any,
  ) {
    const changes: { field: string; old_value: string; new_value: string }[] =
      [];

    for (const key of Object.keys(updated)) {
      const oldValue = old[key];
      const newValue = updated[key];

      if (key === 'assigned_user_id' && oldValue !== newValue) {
        const users = await this.usersService.getAllByIds([
          oldValue,
          newValue ?? -1,
        ]);
        changes.push({
          field: key,
          old_value: users.find((u) => u.id === oldValue)?.fullName ?? '',
          new_value: users.find((u) => u.id === newValue)?.fullName ?? '',
        });
      } else if (key === 'deliveryman_id' && oldValue !== newValue) {
        const delivery = await this.deliveryManService.getAllByIds([
          oldValue,
          newValue,
        ]);
        changes.push({
          field: key,
          old_value: delivery.find((d) => d.id === oldValue)?.name ?? '',
          new_value: delivery.find((d) => d.id === newValue)?.name ?? '',
        });
      } else if (key === 'delivery_date' && oldValue !== newValue) {
        changes.push({
          field: key,
          old_value: oldValue?.toString() ?? '',
          new_value: newValue?.toString() ?? '',
        });
      } else if (!['tags'].includes(key) && oldValue !== newValue) {
        changes.push({ field: key, old_value: oldValue, new_value: newValue });
      }
    }

    if (old.contact.id !== contact.id) {
      changes.push({
        field: 'contact',
        old_value: old.contact.name,
        new_value: contact.name,
      });
    }

    return changes;
  }

  private emitSocket(event: string, deal: Deal, stage_id: number) {
    this.crmSocketServer?.emit(event, { deal, deal_stage_id: stage_id });
  }

  private async handleStageChange(
    old_stage_id: number,
    new_stage_id: number,
    deal: Deal,
    user_id: number,
  ) {
    this.emitSocket('update-deal', deal, new_stage_id);

    if (old_stage_id !== new_stage_id) {
      const [fromStage, toStage] = await this.dealStageService.getStageNames([
        old_stage_id,
        new_stage_id,
      ]);
      await this.activityService.createActivity(
        {
          deal_id: deal.id,
          type: DealActivityType.STAGE_CHANGE,
          is_pin: false,
          metadata: { from_stage: fromStage, to_stage: toStage },
        },
        user_id,
      );
    }
  }
}
