import { ApiProperty } from '@nestjs/swagger';
import { TagProps } from 'src/domain/entities/tag/tag.contact';
import { AssignedEventsToUsers } from 'src/domain/value-objects/assigned-events-to-users.value-object';

export class InputGetAllEventsDTO {
  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  currentMonth: Date;
}

export class OutputGetAllEventsDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  allDay: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startsOf?: Date;

  @ApiProperty()
  endsOf?: Date;

  @ApiProperty()
  tag: TagProps;

  @ApiProperty({ isArray: true, type: AssignedEventsToUsers })
  assignedEventToUsers: AssignedEventsToUsers[];
}
