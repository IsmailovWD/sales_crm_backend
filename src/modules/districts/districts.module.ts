import { Module, NestModule } from '@nestjs/common';
import { Districts } from './entities/districts.entity';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../libs/database/database.module';
@Module({
  imports: [UsersModule, DatabaseModule],
  providers: [DistrictsService],
  controllers: [DistrictsController],
  exports: [DistrictsService],
})
export class DistrictsModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DistrictsController);
  }
}
