import { Module, NestModule } from '@nestjs/common';
import { DeliveryManService } from './deliveryMan.service';
import { DeliveryManController } from './deliveryMan.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../libs/database/database.module';
import { BranchModule } from '../branch/branch.module';

@Module({
  imports: [UsersModule, DatabaseModule, BranchModule],
  providers: [DeliveryManService],
  controllers: [DeliveryManController],
  exports: [DeliveryManService],
})
export class DeliveryManModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeliveryManController);
  }
}
