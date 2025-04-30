import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UserProps } from '../entities/user/user.contact';
import { NotificationProps } from '../entities/notification/notification.contact';

export class NotificationsToUsers {
  uuid: string;
  isSender: boolean;
  userUuid: string;
  notificationUuid: string;

  @ApiProperty({ type: PickType(UserProps, ['name', 'email', 'uuid']) })
  user: UserProps;
  @ApiProperty({ type: OmitType(NotificationProps, ['NotificationsToUsers']) })
  notification: NotificationProps;
}
