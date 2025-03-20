import { ApiProperty } from '@nestjs/swagger';

export class InpuGetAllHabitsDTO {
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
