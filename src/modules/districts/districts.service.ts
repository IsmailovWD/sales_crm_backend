import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Districts } from './entities/districts.entity';
import { CreateDistrictsDto } from './dto/create-districts.dto';
import { UpdateDistrictsDto } from './dto/update-districts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(Districts)
    private districtsRepo: Repository<Districts>,
  ) {}

  getAll = async () => {
    return await this.districtsRepo.find();
  };
  create = async (body: CreateDistrictsDto) => {
    return await this.districtsRepo.save(
      {
        name: body.name,
        region: { id: +body.region_id },
      },
      {},
    );
  };

  update = async (body: UpdateDistrictsDto, id: number) => {
    return await this.districtsRepo.update({ id }, body);
  };

  delete = async (id: number) => {
    return this.districtsRepo.delete({ id });
  };
}
