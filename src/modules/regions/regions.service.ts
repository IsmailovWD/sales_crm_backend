import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Regions } from './entities/regions.entity';
import { CreateRegionsDto } from './dto/create-regions.dto';
import { UpdateRegionsDto } from './dto/update-regions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';

@Injectable()
export class RegionsService extends BaseService<Regions> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Regions);
  }

  async getAll() {
    return await this.getRepo().find();
  }
  async create(body: CreateRegionsDto) {
    return await this.getRepo().save(body);
  }

  async update(body: UpdateRegionsDto, id: number) {
    const data = await this.getRepo().update({ id }, body);
    return body;
  }

  async delete(id: number) {
    return await this.getRepo().delete({ id: id });
  }

  async getByIdWithDistricts(id: number) {
    const region = await this.getRepo().findOne({
      where: { id },
      relations: ['districts'],
    });

    if (!region) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: region.id,
      name: region.name,
      totalDistricts: region.districts.length,
      districts: region.districts,
    };
  }

  async getAllWithDistricts() {
    const regions = (
      await this.getRepo().find({
        select: ['id', 'name'],
        relations: ['districts'],
      })
    ).map((region) => ({
      key: region.id,
      label: region.name,
      children: region.districts.map((district) => ({
        key: district.id,
        label: district.name,
      })),
    }));
    return regions;
  }
}
