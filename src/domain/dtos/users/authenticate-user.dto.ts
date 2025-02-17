import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UnauthorizedError } from 'src/domain/errors/users/unauthorized.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Authenticate User' })
export class InputAuthenticateUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export type OutputAuthenticateUserDTO = Either<
  MissingParamError | UnexpectedError | UnauthorizedError | UserNotfoundError,
  { access_token: string }
>;
