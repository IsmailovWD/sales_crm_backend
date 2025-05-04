import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { BaseGateway } from './base.gateway';
import { Socket } from 'socket.io';
import socketNamespace from '../../utils/socket.namespace';
import { DealService } from 'src/modules/deal/deal.service';

@WebSocketGateway({
  namespace: socketNamespace.crm,
  cors: {
    origin: true,
    credentials: true,
  },
})
export class CrmGateway extends BaseGateway implements OnGatewayInit {
  constructor(private readonly dealService: DealService) {
    super();
  }

  afterInit(server: any) {
    this.dealService.setSocketServer(server);
  }

  @SubscribeMessage('remove-deal')
  handleMessage(
    @MessageBody() data: { id: number; deal_stage_id: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('remove-deal', data);
  }

  @SubscribeMessage('add-deal')
  handleAddLead(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.dealService.updateStage(
      data.deal,
      data.deal_stage_id,
      client.data.user.id,
    );
    client.broadcast.emit('add-deal', data);
  }
}
