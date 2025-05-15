import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { Brackets, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseService } from '../../libs/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '../base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, User);
  }

  async createUser(body: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.getRepo().findOneBy({ username: body.username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const data = {
      ...body,
      password: await this.hashPassword(body.password),
    };

    const { password, ...newUser } = await this.getRepo().save(data);
    return newUser;
  }

  async getAllUsers(
    size: number,
    page: number,
    search?: string,
  ): Promise<{ data: User[]; count: number }> {
    if (search) {
      const [data, count] = await this.getRepo()
        .createQueryBuilder('user')
        .where(
          new Brackets((qb) => {
            qb.where('user.username ILIKE :search', { search: `%${search}%` })
              .orWhere('user.email ILIKE :search', { search: `%${search}%` })
              .orWhere('user.fullName ILIKE :search', {
                search: `%${search}%`,
              });
          }),
        )
        .andWhere('user.id NOT IN (:...excludedIds)', { excludedIds: [1, 2] })
        .orderBy('user.createdAt', 'DESC')
        .skip((page - 1) * size)
        .take(size)
        .getManyAndCount();

      return { data, count };
    }
    const [data, count] = await this.getRepo()
      .createQueryBuilder('user')
      .andWhere('user.id NOT IN (:...excludedIds)', { excludedIds: [1, 2] })
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return { data, count };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.getRepo().findOneBy({
      id,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.getRepo()
      .createQueryBuilder('user')
      .select(['user.password', 'user.username', 'user.id'])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(
    id: number,
    body: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.getRepo().findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.fullName = body.fullName;
    user.username = body.username;
    user.email = body.email;
    user.salary = body.salary;
    user.sales_kpi = body.sales_kpi;
    if (body.password) {
      user.password = await this.hashPassword(body.password);
    }
    await this.getRepo().save(user);
    let { password, ...res } = user;
    return res;
  }

  async getAllByIds(ids: number[]) {
    return await this.getRepo().findBy({ id: In(ids) });
  }
}
