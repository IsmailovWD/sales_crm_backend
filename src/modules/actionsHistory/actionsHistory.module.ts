import { Module, NestModule } from '@nestjs/common';
import { ActionsHistory } from './entities/actionsHistory.entity';
import { ActionsHistoryService } from './actionsHistory.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActionsHistory]), UsersModule],
  providers: [ActionsHistoryService],
  controllers: [],
  exports: [ActionsHistoryService],
})
export class ActionsHistoryModule {} /*implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(ActionsHistoryController);
  }
}*/
