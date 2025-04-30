import { right } from 'src/infra/utils/either/either';
import { Entity } from '../entity';
import { NotificationProps } from './notification.contact';

export class Notification extends Entity<NotificationProps> {
  constructor(props: NotificationProps, uuid?: string) {
    super();
    this.create(props, uuid);
    this.result = right(this.toValue());
  }
}
