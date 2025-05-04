import { Module } from '@nestjs/common';
import { CheckController } from './controller';

@Module({
  imports: [],
  providers: [],
  controllers: [CheckController],
  exports: [],
})
export class CheckModule {}
