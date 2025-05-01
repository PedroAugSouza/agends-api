import { ApiProperty, PickType } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { NotificationsToUsers } from 'src/domain/value-objects/notifications-to-users.value-object';

export class InputGetAllNotificationDTO {
  @ApiProperty()
  userUuid: string;
}

export class OutputGetAllNotificationsDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  NotificationType: NotificationType;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: PickType(NotificationsToUsers, ['user', 'isSender']) })
  NotificationsToUSers: Pick<NotificationsToUsers, 'isSender' | 'user'>[];
}
