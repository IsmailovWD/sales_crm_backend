import { forwardRef, Module, NestModule } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { ContactsModule } from '../contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { DealOrders } from './entities/dealOrders.entity';
import { DealActivityModule } from '../deal-activity/deal-activity.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { DealStageModule } from '../deal-stage/dealStage.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deal, DealOrders]),
    ContactsModule,
    DealActivityModule,
    UsersModule,
    forwardRef(() => DealStageModule),
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
