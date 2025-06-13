import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../libs/database/database.service';

export abstract class BaseService<T extends ObjectLiteral> {
  private readonly saltRounds = 10;

  constructor(
    protected readonly databaseService: DatabaseService,
    private readonly entity: EntityTarget<T>,
  ) {}

  protected getRepo(manager?: EntityManager): Repository<T> {
    if (manager) {
      return manager.getRepository(this.entity);
    }
    const dataSource = this.databaseService.getDataSource();
    return dataSource.getRepository(this.entity);
  }
  async _base_transaction<R>(
    runInTransaction: (manager: EntityManager) => Promise<R>,
  ): Promise<R> {
    const dataSource = this.databaseService.getDataSource();
    return await dataSource.transaction(runInTransaction);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // crud
  async _base_create(body: DeepPartial<T>): Promise<Omit<T, 'password'>> {
    console.log(body);
    const { ...model } = await this.getRepo().save({ ...body });
    delete model.password;
    return model;
  }

  async _base_findAll(where?: FindOptionsWhere<T>): Promise<T[]> {
    return await this.getRepo().find({ where });
  }

  async _base_findById(id: number): Promise<T> {
    const model = await this.getRepo().findOneBy({ id } as any);
    if (!model) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return model;
  }

  async _base_update(body: DeepPartial<T>, id: number): Promise<T> {
    const model = await this.getRepo().findOneBy({ id } as any);
    if (!model) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return await this.getRepo().save({ ...model, ...body });
  }

  async _base_delete(id: number): Promise<T> {
    const model = await this.getRepo().findOneBy({ id } as any);
    if (!model) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return await this.getRepo().remove(model);
  }
}
