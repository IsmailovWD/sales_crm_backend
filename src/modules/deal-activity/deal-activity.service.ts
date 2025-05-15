import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DealActivity } from './entities/deal-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { CreateDealActivityDto } from './dto/create-deal-activity.dto';
import { User } from '../users/entities/user.entity';
import * as _ from 'lodash';
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';
@Injectable()
export class DealActivityService extends BaseService<DealActivity> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, DealActivity);
  }

  createActivity = async (
    deal: CreateDealActivityDto | CreateDealActivityDto[],
    user_id: number,
  ) => {
    try {
      let newBody: (CreateDealActivityDto & { user_id: number })[] = [];
      if (Array.isArray(deal)) {
        newBody = deal.map((item) => {
          return {
            ...item,
            user_id: user_id,
          };
        });
      } else {
        newBody = [
          {
            ...deal,
            user_id: user_id,
          },
        ];
      }

      const activity = await this.getRepo().save(newBody);

      return await this.getRepo().findOneOrFail({
        where: { id: In(activity.map((item) => item.id)) },
        relations: { user: true },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  getAllWithPagination = async (
    page: number,
    limit: number,
    deal_id: number,
  ) => {
    const activities = await this.getRepo().find({
      where: {
        deal_id: deal_id,
        deleted_at: IsNull(),
        user: {
          deletedAt: IsNull(),
        },
      },
      relations: {
        user: true,
      },
      order: {
        is_pin: 'DESC',
        created_at: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const pinActivities = activities.filter(
      (activity) => activity.is_pin === true,
    );
    const unPinActivities = activities.filter(
      (activity) => activity.is_pin === false,
    );
    const grouped: Record<string, DealActivity[]> = _.groupBy(
      unPinActivities,
      (activity: DealActivity) =>
        activity.created_at.toISOString().slice(0, 10),
    );
    const paginated = Object.entries(grouped).map(([date, activities]) => ({
      date,
      type: 'date',
      data: activities.map((activity) => ({
        id: activity.id,
        deal_id: activity.deal_id,
        user_id: activity.user_id,
        type: activity.type,
        metadata: activity.metadata,
        created_at: activity.created_at,
        updated_at: activity.updated_at,
        user: {
          id: activity.user.id,
          username: activity.user.username,
          fullName: activity.user.fullName,
        },
      })),
    }));

    if (pinActivities.length) {
      paginated.unshift({ data: pinActivities, type: 'pin', date: 'pin' });
    }

    return paginated;
  };
}
