import { Module, NestModule } from '@nestjs/common';
import { DeliveryMan } from './entities/deliveryMan.entity';
import { DeliveryManService } from './deliveryMan.service';
import { DeliveryManController } from './deliveryMan.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryMan]), UsersModule],
  providers: [DeliveryManService],
  controllers: [DeliveryManController],
  exports: [DeliveryManService],
})
export class DeliveryManModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeliveryManController);
  }
}
