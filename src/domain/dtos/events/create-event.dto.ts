import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { InvalidTimeError } from 'src/domain/errors/events/invalid-time.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Create Event' })
export class InputCreateEventDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  allDay: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty({ nullable: true })
  startsOf?: Date;

  @ApiProperty({ nullable: true })
  endsOf?: Date;

  @ApiProperty()
  tagUuid: string;

  @ApiProperty()
  userUuid: string;

  @ApiProperty({ nullable: true })
  assignedUsers?: string[];
}

export type OutputCreateEventDTO = Either<
  | MissingParamError
  | UnexpectedError
  | InvalidTimeError
  | ParamInvalidError
  | UserNotfoundError,
  void
>;
