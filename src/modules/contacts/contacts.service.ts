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
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';

@Injectable()
export class ContactsService extends BaseService<Contacts> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Contacts);
  }

  async getAll(
    branch_id: number,
    size: number,
    page: number,
    type: 'client' | 'supplier',
    search?: string,
  ) {
    const query = this.getRepo()
      .createQueryBuilder('contact')
      .where('contact.branch_id = :branchId', { branchId: branch_id });

    if (search) {
      query.andWhere(
        '(LOWER(contact.name) LIKE LOWER(:search) OR contact.phone_number LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (type === 'client') {
      query.andWhere('contact.is_client = true');
    } else if (type === 'supplier') {
      query.andWhere('contact.is_supplier = true');
    }

    const [data, count] = await query
      .select([
        'contact.id',
        'contact.name',
        'contact.phone_number',
        'contact.dial_code',
        'contact.country_code',
        'contact.is_client',
        'contact.is_supplier',
        'contact.createdAt',
      ])
      .orderBy('contact.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return { data, count };
  }

  async create(body: CreateContactsDto) {
    let contact = await this.getRepo().findOneBy({
      phone_number: body.phone_number,
    });

    contact = await this.getRepo().save(body);

    return contact;
  }

  async update(body: UpdateContactsDto, id: string) {
    try {
      const preloadData = await this.getRepo().preload({
        ...body,
        id: +id,
      });

      if (!preloadData) {
        throw new NotFoundException('Contact not found');
      }

      await this.getRepo().save(preloadData);
      const contact = await this.getById(id);
      return contact;
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
        // 'name',
        'phone_number',
        'dial_code',
        'country_code',
        'is_client',
        'is_supplier',
        'createdAt',
      ],
    });

    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }

    return contact;
  }
}
