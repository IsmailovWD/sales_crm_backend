import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeliveryMan } from './entities/deliveryMan.entity';
import { CreateDeliveryManDto } from './dto/create-deliveryMan.dto';
import { UpdateDeliveryManDto } from './dto/update-deliveryMan.dto';
import { BaseService } from '../base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class DeliveryManService extends BaseService<DeliveryMan> {
  constructor(
    @InjectRepository(DeliveryMan)
    private DeliveryManModel: Repository<DeliveryMan>,
  ) {
    super(DeliveryManModel);
  }

  async getAll(size: number, page: number, search?: string) {
    const filter = search
      ? new Brackets((qb) => {
          qb.where('delivery_man.name ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('delivery_man.phone_number ILIKE :search', {
            search: `%${search}%`,
          });
        })
      : {};

    const [data, count] = await this.DeliveryManModel.findAndCount({
      where: filter,
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: -1 },
    });

    return { data, count };
  }
  async create(body: CreateDeliveryManDto) {
    body.password = await this.hashPassword(body.password);

    const { password, ...model } = await this.DeliveryManModel.save(body);

    return model;
  }

  async update(body: UpdateDeliveryManDto, id: number) {
    try {
      if (body.password) {
        body.password = await this.hashPassword(body.password);
      } else {
        delete body.password;
      }

      const model = await this.DeliveryManModel.findOneBy({ id });

      if (!model) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      model.name = body.name;
      model.phone_number = body.phone_number;
      model.dial_code = body.dial_code;
      model.country_code = body.country_code || null;
      model.region_id = body.region_id || null;
      model.district_id = body.district_id ?? null;
      model.salary_type = body.salary_type;
      model.salary_value = body.salary_value;
      model.werehouse_available = body.werehouse_available;
      if (body.password) model.password = body.password;

      await this.DeliveryManModel.save(model);

      return await this.findById({ id });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    return await this.DeliveryManModel.delete({ id });
  }

  async findById(query: FindOptionsWhere<DeliveryMan>) {
    const data = await this.DeliveryManModel.findOne({
      where: query,
      relations: ['region', 'district'],
    });
    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
