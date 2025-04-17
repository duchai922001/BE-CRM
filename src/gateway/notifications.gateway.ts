import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*', // hoặc giới hạn domain production
  },
})
@Injectable()
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationsGateway.name);

  @WebSocketServer()
  server: Server;

  private users: Record<number, string> = {};

  handleConnection(client: any, ...args: any[]) {
    const userId = Number(client.handshake.query.userId);
    if (userId) {
      this.users[userId] = client.id;
      this.logger.log(`User ${userId} connected with socket ${client.id}`);
    }
  }

  handleDisconnect(client: any) {
    const disconnectedUserId = Object.keys(this.users).find(
      (key) => this.users[Number(key)] === client.id,
    );
    if (disconnectedUserId) {
      delete this.users[Number(disconnectedUserId)];
      this.logger.log(
        `User ${disconnectedUserId} disconnected from socket ${client.id}`,
      );
    }
  }

  sendNotification(userId: number, payload: any) {
    const socketId = this.users[userId];
    if (socketId) {
      this.server.to(socketId).emit('taskAssigned', payload);
    }
  }
}
