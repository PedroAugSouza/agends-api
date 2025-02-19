import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Create Tag' })
export class InputCreateTagDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;
}

export type OutputCreateTagDTO = Either<
  MissingParamError | UnexpectedError | UserNotfoundError | ParamInvalidError,
  void
>;
