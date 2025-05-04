import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DealStage } from './entities/dealStage.entity';
import { CreateDealStageDto } from './dto/create-deal-stage.dto';
import { UpdateDealStageDto } from './dto/update-deal-stage.dto';
import { UserStageOrder } from './entities/userStageOrder.entity';
import { ChangeDealStageDto } from './dto/change-deal-stage.dto';
import { Deal } from '../deal/entities/deal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DealStageService {
  constructor(
    @InjectRepository(DealStage) private dealStageRepo: Repository<DealStage>,
    @InjectRepository(UserStageOrder)
    private userStageOrderRepo: Repository<UserStageOrder>,
    @InjectRepository(Deal) private dealRepo: Repository<Deal>,
  ) {}
  async getAllDealStageWithDeal(user: User) {
    try {
      const userStageOrder = await this.userStageOrderRepo.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ['dealStage'],
      });
      let result: (DealStage & { totalCount: number })[] = [];
      const data = await this.dealStageRepo.find();
      for (let i = 0; i < data.length; i++) {
        const stage = data[i];
        const { '0': deals, '1': count } = await this.dealRepo.findAndCount({
          where: {
            stage: {
              id: stage.id,
            },
          },
          relations: ['contact'],
          take: 20,
          order: {
            createdAt: -1,
          },
        });
        result.push({
          ...stage,
          deals,
          totalCount: count,
        });
      }
      if (userStageOrder.length) {
        const stageIds = userStageOrder.map((stage) => stage.deal_stage_id);

        return stageIds.map((id) => result.find((stage) => stage.id == id));
      } else {
        return result;
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateCrmStage(body: UpdateDealStageDto, id: number) {
    try {
      const model = await this.dealStageRepo.findOneBy({ id });

      if (!model) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      model.name = body.name ?? '';
      model.color = body.color ?? '';
      return await this.dealStageRepo.save(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeStageOrder(body: ChangeDealStageDto[], user: User) {
    try {
      await this.userStageOrderRepo.delete({
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
      return await this.userStageOrderRepo.insert(newBody);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllOnlyStages() {
    try {
      return await this.dealStageRepo.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByIds(ids: number[]) {
    try {
      return await this.dealStageRepo.find({
        where: {
          id: In(ids),
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
