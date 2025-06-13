import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Branch } from './entities/branch.entity';
import { DatabaseService } from '../../libs/database/database.service';
import { In } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BranchService extends BaseService<Branch> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Branch);
  }

  async getAllByIds(ids: number[]) {
    return await this.getRepo().find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(name: string, user_id: number, image?: string) {
    const dataSource = this.databaseService.getDataSource();
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const branchRepo = queryRunner.manager.getRepository(Branch);

      const branch = branchRepo.create({ name, image });
      const savedBranch = await branchRepo.save(branch);
      console.log(savedBranch.id, user_id);
      await queryRunner.manager
        .createQueryBuilder()
        .relation(User, 'branches')
        .of(user_id)
        .add(savedBranch.id);

      await queryRunner.commitTransaction();
      return savedBranch;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
