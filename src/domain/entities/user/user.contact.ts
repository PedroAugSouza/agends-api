import { ApiProperty } from '@nestjs/swagger';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';

export class UserProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  dateBirth: Date;

  @ApiProperty({ enum: ['ENABLE', 'DISABLE'] })
  status: UserStatusValueObject;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
