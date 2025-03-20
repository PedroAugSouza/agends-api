import { ApiProperty } from '@nestjs/swagger';

export class InputGetHabitByUuidDTO {
  @ApiProperty()
  uuid: string;
}

export class OutputGetHabitByUuidDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  dayHabit: number[];
}
