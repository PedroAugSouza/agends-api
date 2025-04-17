import { ApiProperty } from '@nestjs/swagger';
import { EntityProps } from '../props';
import { TagProps } from '../tag/tag.contact';
import { AssignedEventsToUsers } from 'src/domain/value-objects/assigned-events-to-users.value-object';

export class EventProps extends EntityProps {
  @ApiProperty()
  name: string;

  @ApiProperty({ default: false })
  allDay: boolean = false;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startsOf?: Date;

  @ApiProperty()
  endsOf?: Date;

  @ApiProperty()
  tagUuid: string;

  @ApiProperty({ nullable: true })
  Tag?: TagProps;

  @ApiProperty({ isArray: true, type: AssignedEventsToUsers, nullable: true })
  AssigneeEventToUsers?: AssignedEventsToUsers[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
