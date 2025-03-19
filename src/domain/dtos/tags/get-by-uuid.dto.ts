import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Input Get By Uuid' })
export class InputGetTagByUuidDTO {
  @ApiProperty()
  uuid: string;
}

@ApiSchema({ name: 'Output Get By Uuid' })
export class OuputGetTagByUuidDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}
