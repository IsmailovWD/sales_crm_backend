import { forwardRef, Module, NestModule } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { ContactsModule } from '../contacts/contacts.module';
import { DealActivityModule } from '../deal-activity/deal-activity.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { DealStageModule } from '../deal-stage/dealStage.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../libs/database/database.module';
import { DeliveryManModule } from '../deliveryMan/deliveryMan.module';
import { DealOrdersModule } from '../deal-orders/deal-orders.module';
@Module({
  imports: [
    ContactsModule,
    DealActivityModule,
    UsersModule,
    forwardRef(() => DealStageModule),
    DatabaseModule,
    DeliveryManModule,
    DealOrdersModule,
  ],
  controllers: [DealController],
  providers: [DealService],
  exports: [DealService],
})
export class DealModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DealController);
  }
}
