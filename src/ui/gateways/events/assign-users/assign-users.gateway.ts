import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
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
import { OnSocket } from 'src/infra/socket/on-socket';

export class AssignUsersGateway extends OnSocket {
  constructor(
    @Inject(DiRepository.NOTIFICATIONS)
    protected readonly notificationsRepository: INotificationsRepository,
    @Inject(DiRepository.EVENTS)
    protected readonly eventsRepository: IEventRepository,
    @Inject(DiRepository.USERS)
    protected readonly usersRepository: IUserRepository,
    protected readonly jwtService: JwtService,
  ) {
    super(jwtService);
  }

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
              uuid: randomUUID(),
            },
            {
              isSender: false,
              userUuid: recipient.uuid,
              uuid: randomUUID(),
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
}
