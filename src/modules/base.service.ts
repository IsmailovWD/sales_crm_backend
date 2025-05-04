import { HttpException, HttpStatus } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class BaseService<T extends ObjectLiteral> {
  private readonly saltRounds = 10;

  constructor(private readonly model: Repository<T>) {}

  async createBase(createDto: DeepPartial<T>): Promise<T> {
    return await this.model.save(createDto);
  }

  async findAllBase(): Promise<T[]> {
    return await this.model.find();
  }

  async findByIdBase(query: FindOptionsWhere<T>): Promise<T> {
    const data = await this.model.findOne({
      where: query,
    });
    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async updateByIdBase(id: string, updateDto: DeepPartial<T>): Promise<T> {
    const updatedData = await this.model.preload({
      id,
      ...updateDto,
    });

    if (!updatedData) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }

    return this.model.save(updatedData);
  }

  async deleteByIdBase(id: string): Promise<string> {
    const result = await this.model.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }
    return 'data has been deleted';
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
