import { NotificationProps } from '../entities/notification/notification.contact';

export interface INotificationsRepository {
  send(input: NotificationProps): Promise<void> | void;
  findAll(
    userUuid: string,
  ): NotificationProps[] | null | Promise<NotificationProps[] | null>;
  markAsRead(uuid: string): void | Promise<void>;
}
