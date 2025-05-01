import { NotificationProps } from '../entities/notification/notification.contact';

export interface INotificationsRepository {
  send(input: NotificationProps): Promise<void> | void;
  findByUuid(
    uuid: string,
  ): NotificationProps | null | Promise<NotificationProps | null>;
  findAll(
    userUuid: string,
  ): NotificationProps[] | null | Promise<NotificationProps[] | null>;
  markAsRead(uuid: string): void | Promise<void>;
}
