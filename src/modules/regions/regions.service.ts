import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Regions } from './entities/regions.entity';
import { CreateRegionsDto } from './dto/create-regions.dto';
import { UpdateRegionsDto } from './dto/update-regions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions) private RegionsRepo: Repository<Regions>,
  ) {}

  async getAll() {
    return await this.RegionsRepo.find();
  }
  async create(body: CreateRegionsDto) {
    return await this.RegionsRepo.save(body);
  }

  async update(body: UpdateRegionsDto, id: number) {
    const data = await this.RegionsRepo.update({ id }, body);
    return body;
  }

  async delete(id: number) {
    return await this.RegionsRepo.delete({ id: id });
  }

  async getByIdWithDistricts(id: number) {
    const region = await this.RegionsRepo.findOne({
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
      await this.RegionsRepo.find({
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
