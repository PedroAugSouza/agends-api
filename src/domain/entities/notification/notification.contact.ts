import { NotificationsToUsers } from 'src/domain/value-objects/notifications-to-users.value-object';
import { EntityProps } from '../props';
import { NotificationType } from 'src/domain/value-objects/notification-type.value-object';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationProps extends EntityProps {
  @ApiProperty()
  message: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ enum: ['REMOVE_ASSIGNMENT_OF_USER', 'ASSIGN_USER_TO_EVENT'] })
  notificationType: NotificationType;

  @ApiProperty({ type: NotificationsToUsers, isArray: true })
  NotificationsToUsers?: NotificationsToUsers[];
}
