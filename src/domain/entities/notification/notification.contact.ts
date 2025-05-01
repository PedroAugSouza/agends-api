import { NotificationsToUsers } from 'src/domain/value-objects/notifications-to-users.value-object';
import { EntityProps } from '../props';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';

export class NotificationProps extends EntityProps {
  @ApiProperty()
  message: string;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ enum: ['REMOVE_ASSIGNMENT_OF_USER', 'ASSIGN_USER_TO_EVENT'] })
  NotificationType: NotificationType;

  @ApiProperty({ type: NotificationsToUsers, isArray: true })
  NotificationsToUsers?: Omit<
    NotificationsToUsers,
    'Notifications' | 'notificationUuid'
  >[];
}
