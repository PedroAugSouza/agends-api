import { ApiProperty } from '@nestjs/swagger';

export class InputGetEventByUuidDTO {
  @ApiProperty()
  uuid: string;
}

export class OutputGetEventByUuidDTO {
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
