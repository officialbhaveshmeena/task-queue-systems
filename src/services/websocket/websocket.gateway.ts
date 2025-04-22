
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class WebsocketGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('✅ WebSocket Gateway Initialized');
  }
  handleConnection(client: Socket) {
    // console.log(`📡 Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // console.log(`🔌 Client disconnected: ${client.id}`);
  }

    // Optional: you can add handlers here
    @SubscribeMessage('ping')
    handlePing(client: Socket): string {
      return 'pong';
    }
  
    // Helper to send event
    emitEvent(eventName: string, payload: any) {
      this.server.emit(eventName, payload);
    }
}
