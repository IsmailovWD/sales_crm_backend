import { forwardRef, Module, NestModule } from '@nestjs/common';
import { BranchService } from './branch.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { DatabaseModule } from '../../libs/database/database.module';
import { BranchController } from './branch.controller';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [forwardRef(() => UsersModule), DatabaseModule],
  providers: [BranchService],
  controllers: [BranchController],
  exports: [BranchService],
})
export class BranchModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(BranchController);
  }
}
