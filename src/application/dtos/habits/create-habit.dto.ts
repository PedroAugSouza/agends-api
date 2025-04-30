import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Create Habit' })
export class InputCreateHabitDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty()
  dayHabit: number[];
}

export type OutputCreateHabitDTO = Either<
  MissingParamError | UnexpectedError | ParamInvalidError | UserNotfoundError,
  void
>;
