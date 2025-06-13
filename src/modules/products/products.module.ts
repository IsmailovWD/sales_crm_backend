import { Module, NestModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../libs/database/database.module';
import { BranchModule } from '../branch/branch.module';
@Module({
  imports: [UsersModule, DatabaseModule, BranchModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController);
  }
}
