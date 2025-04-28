import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Remove Event' })
export class InputRemoveEventDTO {
  @ApiProperty()
  uuid: string;
}

export type OutputRemoveEventDTO = Either<
  MissingParamError | UnexpectedError | EventNotFoundError,
  void
>;
