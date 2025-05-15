import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DealStage } from './entities/dealStage.entity';
import { CreateDealStageDto } from './dto/create-deal-stage.dto';
import { UpdateDealStageDto } from './dto/update-deal-stage.dto';
import { UserStageOrder } from './entities/userStageOrder.entity';
import { ChangeDealStageDto } from './dto/change-deal-stage.dto';
import { Deal } from '../deal/entities/deal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { DatabaseService } from '../../libs/database/database.service';
import { DealService } from '../deal/deal.service';
import { BaseService } from '../base.service';

@Injectable()
export class DealStageService extends BaseService<DealStage> {
  // private getRepo(): Repository<DealStage>;
  // private userStageOrderRepo: Repository<UserStageOrder>;
  // private dealRepo: Repository<Deal>;
  constructor(
    protected readonly databaseService: DatabaseService,
    private readonly dealService: DealService,
  ) {
    super(databaseService, DealStage);
  }
  async getAllDealStageWithDeal(user: User) {
    try {
      const userStageOrder = await new UserStageOrderService(
        this.databaseService,
      ).findById({
        user: {
          id: user.id,
        },
      });
      let result: (DealStage & { totalCount: number })[] = [];
      const data = await this.getRepo().find();
      for (let i = 0; i < data.length; i++) {
        const stage = data[i];
        // const { '0': deals, '1': count } = await this.dealRepo.findAndCount({
        //   where: {
        //     stage: {
        //       id: stage.id,
        //     },
        //   },
        //   relations: ['contact'],
        //   take: 20,
        //   order: {
        //     createdAt: -1,
        //   },
        // });
        const deals = await this.dealService.getAll(0, stage.id);
        result.push({
          ...stage,
          deals,
          totalCount: /*count*/ deals.length,
        });
      }
      if (userStageOrder.length) {
        const stageIds = userStageOrder.map((stage) => stage.deal_stage_id);

        return stageIds.map((id) => result.find((stage) => stage.id == id));
      } else {
        return result;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateCrmStage(body: UpdateDealStageDto, id: number) {
    try {
      const model = await this.getRepo().findOneBy({ id });

      if (!model) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      model.name = body.name ?? '';
      model.color = body.color ?? '';
      return await this.getRepo().save(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeStageOrder(body: ChangeDealStageDto[], user: User) {
    try {
      await new UserStageOrderService(this.databaseService).delete({
        user_id: user.id,
      });
      const newBody: Omit<UserStageOrder, 'id' | 'user' | 'dealStage'>[] =
        body.map(({ id, order }) => {
          return {
            deal_stage_id: id,
            order,
            user_id: user.id,
          };
        });
      return await new UserStageOrderService(this.databaseService).insert(
        newBody,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOnlyStages() {
    try {
      return await this.getRepo().find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getStageNames(ids: number[]) {
    try {
      return await this.getRepo().find({
        where: {
          id: In(ids),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}

class UserStageOrderService extends BaseService<UserStageOrder> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, UserStageOrder);
  }
  findById(query: FindOptionsWhere<UserStageOrder>) {
    return this.getRepo().find({
      relations: ['dealStage'],
      where: query,
    });
  }
  delete(query: FindOptionsWhere<UserStageOrder>) {
    return this.getRepo().delete(query);
  }
  insert(data: Omit<UserStageOrder, 'id' | 'user' | 'dealStage'>[]) {
    return this.getRepo().insert(data);
  }
}
