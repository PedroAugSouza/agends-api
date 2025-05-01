import { ApiProperty } from '@nestjs/swagger';
import { NotificationNotFoundError } from 'src/infra/errors/notifications/notification-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

export class InputMarkAsReadDTO {
  @ApiProperty()
  uuid: string;
}

export type OutputMarkAsReadDTO = Either<
  MissingParamError | UnexpectedError | NotificationNotFoundError,
  void
>;
