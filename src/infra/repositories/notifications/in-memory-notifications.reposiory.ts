import { Injectable } from '@nestjs/common';
import { NotificationProps } from 'src/domain/entities/notification/notification.contact';
import { INotificationsRepository } from 'src/domain/repositories/notification.repository';
import { NotificationsToUsers } from 'src/domain/value-objects/notifications-to-users.value-object';

@Injectable()
export class InMemoryNotificationsRepository
  implements INotificationsRepository
{
  private readonly notificaitonsMap: Map<string, NotificationProps> = new Map();
  private readonly notificationsToUsersMap: Map<string, NotificationsToUsers> =
    new Map();

  send(input: NotificationProps): void {
    this.notificaitonsMap.set(input.uuid, input);
  }

  findAll(userUuid: string): NotificationProps[] | null {
    const noificationsToUsers = Array.from(
      this.notificationsToUsersMap.values(),
    ).filter((notificaionToUser) => notificaionToUser.userUuid === userUuid);

    const notifications = Array.from(this.notificaitonsMap.values());

    const result = noificationsToUsers.map((notificaionToUser) => {
      return notifications.filter(
        (notification) =>
          notification.uuid === notificaionToUser.notificationUuid,
      )[0];
    });

    return result ?? null;
  }

  findByUuid(uuid: string): NotificationProps | null {
    const notification = Array.from(this.notificaitonsMap.values()).filter(
      (notification) => notification.uuid === uuid,
    )[0];

    return notification ?? null;
  }
  markAsRead(uuid: string): void {
    const notification = Array.from(this.notificaitonsMap.values()).filter(
      (notification) => notification.uuid === uuid,
    )[0];

    this.notificaitonsMap.set(uuid, {
      ...notification,
      isRead: true,
    });
  }
}
