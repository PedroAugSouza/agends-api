import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';
import { InputRemoveAssignmentDTO } from 'src/application/dtos/events/remove-assignment.dto';
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

export class RemoveAssignmentGateway extends OnSocket {
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

  @SubscribeMessage('remove-assignment')
  handle(
    @MessageBody() input: InputRemoveAssignmentDTO,
    @ConnectedSocket() client: Socket,
  ) {
    const handle = async () => {
      try {
        if (!input.eventUuid) {
          client.emit('error', new MissingParamError('Event'));
          return;
        }
        if (!input.ownerEmail) {
          client.emit('error', new MissingParamError('owner'));
          return;
        }
        if (!input.userEmail) {
          client.emit('error', new MissingParamError('user'));
          return;
        }
        const event = await this.eventsRepository.findByUuid(input.eventUuid);

        if (!event) {
          client.emit('error', new EventNotFoundError());
        }

        const recipient = await this.usersRepository.findByEmail(
          input.userEmail,
        );

        const sender = await this.usersRepository.findByEmail(input.ownerEmail);

        await this.eventsRepository.removeAssignment(
          input.userEmail,
          input.eventUuid,
        );

        const notification = new Notification({
          NotificationType: NotificationType.REMOVE_ASSIGNMENT_OF_USER,
          isRead: false,
          message: `You have been removed of an event`,
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
        client.to(`user:${input.userEmail}`).emit(
          'notification',
          JSON.stringify({
            type: notification.result.value.NotificationType,
            message: notification.result.value.message,
          }),
        );
      } catch (error) {
        this.logger.error(JSON.stringify(new UnexpectedError(error)));
      }
    };
    handle();
  }
}
