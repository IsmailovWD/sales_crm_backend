import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '../../libs/database/database.service';
import { BaseService } from '../base.service';

@Injectable()
export class ProductsService extends BaseService<Products> {
  constructor(protected readonly databaseService: DatabaseService) {
    super(databaseService, Products);
  }
  async getAllProducts(
    size: number,
    page: number,
    search?: string,
  ): Promise<{ data: Products[]; count: number }> {
    try {
      const filter = search ? { name: search } : {};

      const [data, count] = await this.getRepo().findAndCount({
        where: filter,
        select: ['id', 'name', 'price', 'body_summa'],
        skip: (page - 1) * size,
        take: size,
        order: { createdAt: -1 },
      });

      return { data, count };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async productCreate(body: CreateProductDto) {
    try {
      return await this.getRepo().save(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async productUpdate(body: UpdateProductDto, id: number) {
    try {
      const model = await this.getRepo().findOneBy({ id });

      if (!model) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      model.name = body.name ?? '';
      model.price = body.price ?? 0;
      model.body_summa = body.body_summa ?? 0;

      return await this.getRepo().save(model);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllWithBalance() {
    try {
      return await this.getRepo().find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
