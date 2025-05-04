import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}
  async getAllProducts(
    size: number,
    page: number,
    search?: string,
  ): Promise<{ data: Products[]; count: number }> {
    try {
      const filter = search ? { name: search } : {};

      const [data, count] = await this.productRepo.findAndCount({
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
      return await this.productRepo.save(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async productUpdate(body: UpdateProductDto, id: number) {
    try {
      const model = await this.productRepo.findOneBy({ id });

      if (!model) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      model.name = body.name ?? '';
      model.price = body.price ?? 0;
      model.body_summa = body.body_summa ?? 0;

      return await this.productRepo.save(model);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllWithBalance() {
    try {
      return await this.productRepo.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
