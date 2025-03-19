import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Input Get All Tags' })
export class InputGetAllTagsDTO {
  @ApiProperty()
  userUuid: string;
}

@ApiSchema({ name: 'Output Get All Tags' })
export class OutputGetAllTagsDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}
