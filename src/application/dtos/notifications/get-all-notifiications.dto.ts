import { ApiProperty, PickType } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { NotificationsToUsers } from 'src/domain/value-objects/notifications-to-users.value-object';

export class InputGetAllNotificationDTO {
  @ApiProperty()
  userUuid: string;
}

class NotificationsToUsersDTO extends PickType(NotificationsToUsers, [
  'isSender',
  'user',
]) {}

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

  @ApiProperty({
    type: NotificationsToUsersDTO,
    isArray: true,
  })
  NotificationsToUSers: Pick<NotificationsToUsers, 'isSender' | 'user'>[];
}
