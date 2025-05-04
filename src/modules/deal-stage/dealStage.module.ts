import { Module, NestModule } from '@nestjs/common';
import { DealStage } from './entities/dealStage.entity';
import { DealStageService } from './dealStage.service';
import { DealStageController } from './dealStage.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { DealModule } from '../deal/deal.module';
import { UserStageOrder } from './entities/userStageOrder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Deal } from '../deal/entities/deal.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([DealStage, UserStageOrder, User, Deal]),
    UsersModule,
    DealModule,
  ],
  providers: [DealStageService],
  controllers: [DealStageController],
  exports: [DealStageService],
})
export class DealStageModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DealStageController);
  }
}
