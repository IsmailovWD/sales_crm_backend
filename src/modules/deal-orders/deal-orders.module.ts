import { Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { DealOrdersService } from './deal-orders.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DealOrdersService],
  exports: [DealOrdersService],
})
export class DealOrdersModule {}
