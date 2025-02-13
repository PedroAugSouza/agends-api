import { ApiProperty } from '@nestjs/swagger';
import { EntityProps } from '../props';

export class HabitProps extends EntityProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  dayHabit: number[];
}
