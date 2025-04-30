import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Payload {
  message: string;
}

@WebSocketGateway(80)
export class AssignUsersGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('assign-users')
  handle(@MessageBody() data: Payload, @ConnectedSocket() client: Socket) {
    console.log('recebido cz: ' + JSON.stringify(data, null, 2));

    client.emit('assign-users', { message: 'deu certo ' + data.message });

    return {
      asdsda: 'ASDasd',
    };
  }
}
