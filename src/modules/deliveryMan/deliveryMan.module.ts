import { Module, NestModule } from '@nestjs/common';
import { DeliveryMan } from './entities/deliveryMan.entity';
import { DeliveryManService } from './deliveryMan.service';
import { DeliveryManController } from './deliveryMan.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../libs/database/database.module';
@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [DeliveryManService],
  controllers: [DeliveryManController],
  exports: [DeliveryManService],
})
export class DeliveryManModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeliveryManController);
  }
}
