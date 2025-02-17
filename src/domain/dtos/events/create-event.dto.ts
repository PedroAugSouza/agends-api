import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { InvalidTimeError } from 'src/domain/errors/events/invalid-time.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Create Event' })
export class InputCreateEventDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  allDay: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startsOf?: Date;

  @ApiProperty()
  endsOf?: Date;

  @ApiProperty()
  tagUuid: string;
}

export type OutputCreateEventDTO = Either<
  MissingParamError | UnexpectedError | InvalidTimeError,
  void
>;
