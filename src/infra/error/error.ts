import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'IError' })
export class IError {
  @ApiProperty()
  reason: string;

  @ApiProperty()
  message: string;
}
