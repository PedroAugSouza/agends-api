import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InputAssignUserDTO } from 'src/application/dtos/events/assign-user.dto';
import { DiRepository } from 'src/domain/constants/di.constants';
import { Notification } from 'src/domain/entities/notification/notification.entity';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { INotificationsRepository } from 'src/domain/repositories/notification.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { NotificationType } from 'src/domain/value-objects/notification-type.value-object';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@WebSocketGateway(80, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class AssignUsersGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(DiRepository.NOTIFICATIONS)
    private readonly notificationsRepository: INotificationsRepository,
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,
    @Inject(DiRepository.USERS)
    private readonly usersRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('Notification logger');

  @SubscribeMessage('assign-users')
  handle(
    @MessageBody() input: InputAssignUserDTO[],
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (!input.length) {
        client.emit('error', new ParamInvalidError('Body is not provided'));
        return;
      }
      input.map(async (data) => {
        if (!data.eventUuid) {
          client.emit('error', new MissingParamError('Event'));
          return;
        }
        if (!data.ownerEmail) {
          client.emit('error', new MissingParamError('owner'));
          return;
        }
        if (!data.userEmail) {
          client.emit('error', new MissingParamError('user'));
          return;
        }

        const event = await this.eventsRepository.findByUuid(data.eventUuid);

        if (!event) {
          client.emit('error', new EventNotFoundError());
        }

        const recipient = await this.usersRepository.findByEmail(
          data.userEmail,
        );
        const sender = await this.usersRepository.findByEmail(data.ownerEmail);

        await this.eventsRepository.assign(
          data.userEmail,
          data.eventUuid,
          false,
        );

        const notification = new Notification({
          NotificationType: NotificationType.ASSIGN_USER_TO_EVENT,
          isRead: false,
          message: `You have been assigned to a new event`,
          createdAt: new Date(),
          NotificationsToUsers: [
            {
              isSender: true,
              userUuid: sender.uuid,
            },
            {
              isSender: false,
              userUuid: recipient.uuid,
            },
          ],
        });

        if (notification.result.value instanceof ParamInvalidError) return;

        await this.notificationsRepository.send({
          ...notification.result.value,
        });

        client
          .to(`user:${data.userEmail}`)
          .emit(
            'notification',
            JSON.stringify(notification.result.value.message),
          );
        return;
      });
    } catch (error) {
      this.logger.error(JSON.stringify(new UnexpectedError(error)));
    }
  }

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

      client.join(`user:${userEmail}`);
    } catch (error) {
      this.logger.error(JSON.stringify(new UnexpectedError(error), null, 2));
    }
  }
}
