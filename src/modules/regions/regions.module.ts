import { Module, NestModule } from '@nestjs/common';
import { Regions } from './entities/regions.entity';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../libs/database/database.module';
@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [RegionsService],
  controllers: [RegionsController],
  exports: [RegionsService],
})
export class RegionsModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(RegionsController);
  }
}
