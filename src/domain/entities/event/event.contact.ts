import { ApiProperty } from '@nestjs/swagger';
import { EntityProps } from '../props';
import { TagProps } from '../tag/tag.contact';

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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
