import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { DatabaseModule } from '../../libs/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [UsersService, AuthMiddleware],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
