import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Create Tag' })
export class InputCrateTagsDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  userUuid: string;
}

export type OutputCreateTagsDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
