import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { Logger } from '@nestjs/common';

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    try {
      const token: string | undefined = client.handshake.auth?.token;
      const tenantId: string | undefined =
        client.handshake.auth?.['x-tenant-id'];
      if (!token) {
        Logger.error(`Unauthorized client rejected: ${client.id}`);
        client.disconnect();
        return;
      }
      const {
        sub,
        username,
        tenantId: _tenantId,
      } = jwt.verify(token, config.SECRET_JWT! + tenantId) as any;

      if (_tenantId !== tenantId) {
        throw new Error("Tenant id doesn't match");
      }

      Logger.log(
        `Client connected namespace ${client.nsp.name}: ${client.id} with sub: ${sub} username: ${username}`,
      );
      client.data.user = {
        id: sub,
        username: username,
        tenantId: tenantId,
      };
    } catch (e) {
      Logger.error(`Unauthorized client rejected: ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    Logger.warn(`Client disconnected: ${client.data.user?.username}`);
  }
}
