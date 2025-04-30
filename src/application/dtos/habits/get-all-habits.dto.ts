import { ApiProperty } from '@nestjs/swagger';

export class InputGetAllHabitsDTO {
  @ApiProperty()
  userUuid: string;
}

export class OutputGetAllHabitsDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;
}
