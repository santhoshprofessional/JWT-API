import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected:', client.id);
    client.broadcast.emit('user-joined', {
      message: `New user joined the chat:${client.id}`,
    });
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.server.emit('user-left', {
      message: `User left the chat:${client.id}`,
    });
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendMessage')
  handleNewMessage(client: Socket, payload: any) {
    console.log(payload);

    // //single clinet emit
    // client.emit('message', 'Message received');
    // //all clinet emit
    // //Send message to everyone EXCEPT the sender (client)
    // client.broadcast.emit('broadcast', 'Message broadcast from client');
    // //Send message to all clients including the sender
    this.server.emit('broadcast', {
      message: payload,
      sender: client.id,
    });
    // client.broadcast.emit('broadcast', payload);
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: any) {
    console.log(payload);
    client.join(payload.room);
    this.server.to(payload.room).emit('room-joined', {
      message: `User ${client.id} joined the room ${payload.room}`,
    });
  }
  @SubscribeMessage('sendMessageToRoom')
  handleSendMessageToRoom(client: Socket, payload: any) {
    console.log(payload);
    this.server.to(payload.room).emit('message-to-room', {
      message: payload?.message,
      sender: client.id,
    });
  }
}
