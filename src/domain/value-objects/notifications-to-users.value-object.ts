import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UserProps } from '../entities/user/user.contact';
import { NotificationProps } from '../entities/notification/notification.contact';

export class NotificationsToUsers {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  isSender: boolean;

  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  notificationUuid: string;

  @ApiProperty({ type: PickType(UserProps, ['name', 'email', 'uuid']) })
  user: UserProps;
  
  @ApiProperty({ type: OmitType(NotificationProps, ['NotificationsToUsers']) })
  notification: NotificationProps;
}
