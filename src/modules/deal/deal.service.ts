import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { DealCreateDto, OrdersDto } from './dto/deal-create.dto';
import { ContactsService } from '../contacts/contacts.service';
import { Server } from 'socket.io';
import { Deal } from './entities/deal.entity';
import { DealOrders } from './entities/dealOrders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealUpdateDto } from './dto/deal-update.dto';
import { DealActivityService } from '../deal-activity/deal-activity.service';
import { User } from '../users/entities/user.entity';
import { DealActivityType } from '../deal-activity/entities/deal-activity.entity';
import { DealStageService } from '../deal-stage/dealStage.service';

@Injectable()
export class DealService extends BaseService<Deal> {
  private crmSocketServer?: Server;

  constructor(
    @InjectRepository(Deal) private dealRepo: Repository<Deal>,
    private readonly contactService: ContactsService,
    @InjectRepository(DealOrders)
    private orderRepo: Repository<DealOrders>,
    private activityService: DealActivityService,
    private dealStageService: DealStageService,
  ) {
    super(dealRepo);
  }

  setSocketServer(server: Server) {
    this.crmSocketServer = server;
  }

  getAll(size: number, stage: number) {
    return this.dealRepo.find({
      where: { stage: { id: stage } },
      relations: ['contact'],
      skip: size,
      take: 20,
      order: { createdAt: -1 },
    });
  }

  create = async (
    { contact: cnt, orders, deal_stage_id, ...deal }: DealCreateDto,
    user: User,
  ) => {
    try {
      const { model: contact, new: isNewContact } =
        await this.contactService.findOrCreate(cnt);
      const body = {
        ...deal,
        stage: { id: deal_stage_id },
        contact: contact,
        ...deal,
      } as Deal;

      const document = await this.dealRepo.save(body);
      await this.#addChildTables(document, orders);
      await this.newLead(document);
      await this.activityService.createActivity(
        {
          deal_id: document.id,
          type: DealActivityType.ACTION,
          is_pin: false,
          metadata: {
            action: 'create',
          },
        },
        user.id,
      );
      return document;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  };

  update = async (
    { contact: cnt, orders, deal_stage_id, ...deal }: DealUpdateDto,
    id: number,
    user_id: number,
  ) => {
    try {
      const { model: contact, new: isNewContact } =
        await this.contactService.findOrCreate(cnt);
      const document = await this.dealRepo.findOne({
        where: { id },
        relations: ['contact'],
      });
      if (!document) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      const changes: { field: string; old_value: string; new_value: string }[] =
        [];

      for (const key in deal) {
        if (document[key] !== deal[key] && key != 'tags') {
          changes.push({
            field: key,
            old_value: document[key],
            new_value: deal[key],
          });
        }
      }
      if (contact.id !== document.contact.id) {
        changes.push({
          field: 'contact',
          old_value: document.contact.name,
          new_value: contact.name,
        });
      }

      const old_stage_id = document.stage_id;
      document.title = deal.title ?? '';
      document.contact = contact;
      document.stage_id = deal_stage_id;
      document.tags = deal.tags ?? [];
      document.summa = deal.summa ?? 0;
      document.deliveryman_id = deal.deliveryman_id ?? null;
      document.delivery_date = deal.delivery_date ?? null;
      document.region_id = deal.region_id ?? null;
      document.district_id = deal.district_id ?? null;
      document.address = deal.address ?? '';
      document.comment = deal.comment ?? '';
      await this.dealRepo.save(document);
      await this.#addChildTables(document, orders, true);
      await this.updateLead(old_stage_id, deal_stage_id, document, user_id);
      if (changes.length > 0) {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  };

  getById = async (id: number) => {
    try {
      return await this.dealRepo.findOne({
        where: { id },
        relations: ['contact', 'orders', 'region', 'district'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  };

  updateStage = async (
    { id }: Deal,
    deal_stage_id: number,
    user_id: number,
  ) => {
    try {
      const model = await this.dealRepo.findOneBy({ id });
      if (model) {
        const from_stage_name = await this.dealStageService.findByIds([
          model.stage_id,
          deal_stage_id,
        ]);
        await this.activityService.createActivity(
          {
            deal_id: id,
            type: DealActivityType.STAGE_CHANGE,
            is_pin: false,
            metadata: {
              from_stage:
                from_stage_name.find((item) => item.id === model.stage_id)
                  ?.name ?? '',
              to_stage:
                from_stage_name.find((item) => item.id === deal_stage_id)
                  ?.name ?? '',
            },
          },
          user_id,
        );
        return await this.dealRepo.update(id, {
          stage: { id: deal_stage_id },
        });
      }
    } catch (e) {
      // throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  };

  #addChildTables = async (
    model: Deal,
    orders: OrdersDto[],
    isUpdate: boolean = false,
  ) => {
    if (isUpdate) await this.#deleteChildTables(model.id);
    const oTables = orders.map((item) => ({
      ...item,
      deal_id: model.id,
    }));

    if (oTables.length > 0) {
      await this.orderRepo.insert(oTables);
    }
  };

  #deleteChildTables = async (id: number) => {
    await this.orderRepo.delete({ deal: { id } });
  };

  private newLead = async (deal: Deal) => {
    if (this.crmSocketServer) {
      this.crmSocketServer.emit('add-deal', {
        deal,
        deal_stage_id: deal.stage.id,
      });
    }
  };
  private updateLead = async (
    old_stage_id: number,
    new_stage_id: number,
    deal: Deal,
    user_id: number,
  ) => {
    if (this.crmSocketServer) {
      this.crmSocketServer.emit('update-deal', {
        deal,
        old_stage_id,
        new_stage_id,
      });
      if (old_stage_id === new_stage_id) return;
      const from_stage_name = await this.dealStageService.findByIds([
        old_stage_id,
        new_stage_id,
      ]);
      await this.activityService.createActivity(
        {
          deal_id: deal.id,
          type: DealActivityType.STAGE_CHANGE,
          is_pin: false,
          metadata: {
            from_stage:
              from_stage_name.find((item) => item.id === old_stage_id)?.name ??
              '',
            to_stage:
              from_stage_name.find((item) => item.id === new_stage_id)?.name ??
              '',
          },
        },
        user_id,
      );
    }
  };
}
