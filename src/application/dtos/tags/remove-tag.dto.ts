import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Remove Tag' })
export class InputRemoveTagDTO {
  @ApiProperty()
  uuid: string;
}

export type OutputRemoveTagDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
