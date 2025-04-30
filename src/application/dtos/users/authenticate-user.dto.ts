import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UnauthorizedError } from 'src/infra/errors/users/unauthorized.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
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
