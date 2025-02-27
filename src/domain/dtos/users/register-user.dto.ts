import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserAlreadyExistError } from 'src/domain/errors/users/user-already-exists.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Register User' })
export class InputRegisterUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  dateBirth: Date;
}

export type OutputRegisterUserDTO = Either<
  | MissingParamError
  | UnexpectedError
  | ParamInvalidError
  | UserAlreadyExistError,
  void
>;
