import { Inject, Injectable } from '@nestjs/common';
import {
  InputGetAllNotificationDTO,
  OutputGetAllNotificationsDTO,
} from 'src/application/dtos/notifications/get-all-notifiications.dto';
import { DiRepository } from 'src/domain/constants/di.constants';
import { INotificationsRepository } from 'src/domain/repositories/notification.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';

@Injectable()
export class GetAllNotificationsService
  implements
    IUseCase<InputGetAllNotificationDTO, OutputGetAllNotificationsDTO[]>
{
  constructor(
    @Inject(DiRepository.NOTIFICATIONS)
    private readonly notificationsRepository: INotificationsRepository,
  ) {}

  async execute(
    input: InputGetAllNotificationDTO,
  ): Promise<OutputGetAllNotificationsDTO[]> {
    const notifications = await this.notificationsRepository.findAll(
      input.userUuid,
    );

    const result = notifications.map(
      (data) =>
        ({
          uuid: data.uuid,
          message: data.message,
          isRead: data.isRead,
          NotificationType: data.NotificationType,
          NotificationsToUSers: data.NotificationsToUsers.map(
            (notificationsToUsers) => ({
              isSender: notificationsToUsers.isSender,
              user: {
                name: notificationsToUsers.user.name,
                email: notificationsToUsers.user.email,
                uuid: notificationsToUsers.user.uuid,
              },
            }),
          ),
          createdAt: data.createdAt,
        }) as OutputGetAllNotificationsDTO,
    );

    return result ?? [];
  }
}
