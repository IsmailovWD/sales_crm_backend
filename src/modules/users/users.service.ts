import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { Brackets, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(I18nService) private readonly i18n: I18nContext,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    const newUser = await this.userRepo.save(body);
    return newUser;
  }

  async getAllUsers(
    size: number,
    page: number,
    search?: string,
  ): Promise<{ data: User[]; count: number }> {
    if (search) {
      const [data, count] = await this.userRepo
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
    const [data, count] = await this.userRepo
      .createQueryBuilder('user')
      .andWhere('user.id NOT IN (:...excludedIds)', { excludedIds: [1, 2] })
      .orderBy('user.createdAt', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return { data, count };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({
      id,
    });

    if (!user) {
      throw new HttpException(
        await this.i18n.translate('errors.not_found', {
          args: { name: await this.i18n.translate('index.user') },
        }),
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .select(['user.password', 'user.username', 'user.id'])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new HttpException(
        await this.i18n.t('errors.not_found', {
          args: { property: await this.i18n.t('index.user') },
        }),
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
