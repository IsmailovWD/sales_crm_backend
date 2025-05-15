import { Module, NestModule } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../libs/database/database.module';
@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController);
  }
}
