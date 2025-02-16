import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Remove Habit' })
export class InputRemoveHabitDTO {
  @ApiProperty()
  uuid: string;
}

export type OutputRemoveHabitDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
