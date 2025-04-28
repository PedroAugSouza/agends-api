import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { UserProps } from '../entities/user/user.contact';
import { EventProps } from '../entities/event/event.contact';

  export class AssignedEventsToUsers {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  isOwner: boolean;

  @ApiProperty()
  eventUuid: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty({ type: PickType(UserProps, ['name', 'email', 'uuid']) })
  user: UserProps;

  @ApiProperty({ type: OmitType(EventProps, ['AssigneeEventToUsers']) })
  event: EventProps;
}
