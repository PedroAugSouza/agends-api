import { ApiProperty } from '@nestjs/swagger';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';
import { EntityProps } from '../props';

export class UserProps extends EntityProps {
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
