import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@WebSocketGateway(8002, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export abstract class OnSocket implements OnGatewayConnection<Socket> {
  @WebSocketServer() protected server: Server;

  constructor(protected readonly jwtService: JwtService) {}

  protected readonly logger = new Logger('Notification logger');

  @UseGuards(AuthGuard)
  handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const userEmail = payload?.email;

      this.logger.log(`${userEmail}: connected`);

      client.join(`user:${userEmail}`);
    } catch (error) {
      this.logger.error(JSON.stringify(new UnexpectedError(error), null, 2));
    }
  }
}
