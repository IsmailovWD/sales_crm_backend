import { Injectable } from '@nestjs/common';
import { Districts } from './entities/districts.entity';
import { CreateDistrictsDto } from './dto/create-districts.dto';
import { UpdateDistrictsDto } from './dto/update-districts.dto';
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';

@Injectable()
export class DistrictsService extends BaseService<Districts> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Districts);
  }

  getAll = async () => {
    return await this.getRepo().find();
  };
  create = async (body: CreateDistrictsDto) => {
    return await this.getRepo().save(
      {
        name: body.name,
        region: { id: +body.region_id },
      },
      {},
    );
  };

  update = async (body: UpdateDistrictsDto, id: number) => {
    return await this.getRepo().update({ id }, body);
  };

  delete = async (id: number) => {
    return this.getRepo().delete({ id });
  };
}
