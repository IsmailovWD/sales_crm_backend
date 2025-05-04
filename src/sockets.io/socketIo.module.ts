import { Module } from '@nestjs/common';
import * as Gateways from './gateways';
import { DealModule } from '../modules';

@Module({
  imports: [DealModule],
  providers: Object.values(Gateways),
  exports: Object.values(Gateways),
})
export class SocketModule {}
