import { ApiProperty } from '@nestjs/swagger';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

export class InputRemoveAssignmentDTO {
  @ApiProperty()
  userUuid: string;
  @ApiProperty()
  eventUuid: string;
}

export type OutputRemoveAssignmentDTO = Either<
  MissingParamError | UnexpectedError | EventNotFoundError,
  void
>;
