import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event/event.entity';
import { EntityProps } from '../props';

export class TagProps extends EntityProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty({ nullable: true })
  events?: Event[];
}
