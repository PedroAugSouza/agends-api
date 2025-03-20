import { ApiProperty } from '@nestjs/swagger';

export class InputGetAllEventsDTO {
  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  month: number;

  @ApiProperty()
  week: number;
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
  tagUuid: string;

  @ApiProperty()
  userUuid: string;
}
