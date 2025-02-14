import { ApiProperty } from '@nestjs/swagger';
import { EntityProps } from '../props';

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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
