import { forwardRef, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { DatabaseModule } from '../../libs/database/database.module';
import { BranchModule } from '../branch/branch.module';
@Module({
  imports: [DatabaseModule, forwardRef(() => BranchModule)],
  providers: [UsersService, AuthMiddleware],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
