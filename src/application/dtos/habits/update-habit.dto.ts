import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Update Habit' })
export class InputUpdateHabitDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  color?: string;

  @ApiProperty({ nullable: true })
  userUuid?: string;

  @ApiProperty({ nullable: true })
  dayHabit?: number[];
}

export type OutputUpdateHabitDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
