import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contacts } from './entities/contacts.entity';
import { CreateContactsDto } from './dto/create-contacts.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';

@Injectable()
export class ContactsService extends BaseService<Contacts> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Contacts);
  }

  async getAll(
    size: number,
    page: number,
    type: 'client' | 'supplier',
    search?: string,
  ) {
    const filter: any = {};

    if (search) {
      filter.name = new RegExp(search, 'i');
      filter.phone_number = new RegExp(search, 'i');
    }
    if (type === 'client') filter.is_client = true;
    else if (type === 'supplier') filter.is_supplier = true;

    const [data, count] = await this.getRepo().findAndCount({
      where: filter,
      select: [
        'id',
        'name',
        'phone_number',
        'dial_code',
        'country_code',
        'is_client',
        'is_supplier',
        'createdAt',
        'region_id',
        'district_id',
      ],
      relations: ['region', 'district'],
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
    });

    return { data, count };
  }

  async create(body: CreateContactsDto) {
    const contact = this.getRepo().create(body);

    return await this.getRepo().save(contact);
  }

  async update(
    {
      country_code,
      dial_code,
      district_id,
      region_id,
      is_client,
      is_supplier,
      name,
      phone_number,
    }: UpdateContactsDto,
    id: string,
  ) {
    try {
      const preloadData = await this.getRepo().preload({
        id: +id,
        country_code,
        dial_code,
        district_id,
        region_id,
        is_client,
        is_supplier,
        name,
        phone_number,
      });

      if (!preloadData) {
        throw new NotFoundException('Contact not found');
      }

      await this.getRepo().save(preloadData);
      return await this.getById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const result = await this.getRepo().delete(id);
    if (result.affected === 0) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return 'Contact has been deleted';
  }

  async findOrCreate(body: CreateContactsDto) {
    let model = await this.getRepo().findOne({
      where: { phone_number: body.phone_number },
    });

    if (model) {
      return { model, new: false };
    }

    model = await this.getRepo().save(body);

    return { model, new: true };
  }

  async getById(id: string) {
    const contact = await this.getRepo().findOne({
      where: { id: +id },
      select: [
        'id',
        'name',
        'phone_number',
        'dial_code',
        'country_code',
        'is_client',
        'is_supplier',
        'createdAt',
        'region_id',
        'district_id',
      ],
      relations: ['region', 'district'],
    });

    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }

    return contact;
  }
}
