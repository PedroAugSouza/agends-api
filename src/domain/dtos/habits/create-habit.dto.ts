import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';

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
  MissingParamError | UnexpectedError,
  void
>;
