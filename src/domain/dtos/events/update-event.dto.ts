import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { InvalidTimeError } from 'src/domain/errors/events/invalid-time.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Update Event' })
export class InputUpdateEventDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  allDay?: boolean;

  @ApiProperty({ nullable: true })
  date?: Date;

  @ApiProperty({ nullable: true })
  startsOf?: Date;

  @ApiProperty({ nullable: true })
  endsOf?: Date;

  @ApiProperty({ nullable: true })
  tagUuid?: string;
}

export type OutputUpdateEventDTO = Either<
  MissingParamError | UnexpectedError | InvalidTimeError,
  void
>;
