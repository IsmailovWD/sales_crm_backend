import { forwardRef, Module, NestModule } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { DatabaseModule } from '../../libs/database/database.module';
import { PipelineController } from './pipeline.controller';
import { UsersModule } from '../users/users.module';
//
import { DealStageModule } from '../deal-stage/dealStage.module';
@Module({
  imports: [forwardRef(() => UsersModule), DatabaseModule, DealStageModule],
  providers: [PipelineService],
  controllers: [PipelineController],
  exports: [PipelineService],
})
export class PipelineModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(PipelineController);
  }
}
