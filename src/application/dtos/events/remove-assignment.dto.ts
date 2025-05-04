import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { Either } from 'src/infra/utils/either/either';

export class InputRemoveAssignmentDTO {
  ownerEmail: string;
  userEmail: string;

  eventUuid: string;
}

export type OutputRemoveAssignmentDTO = Either<
  MissingParamError | UnexpectedError | EventNotFoundError | UserNotfoundError,
  void
>;
