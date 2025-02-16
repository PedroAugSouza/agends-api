import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Update Tag' })
export class InputUpdateTagDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  color?: string;

  @ApiProperty({ nullable: true })
  userUuid?: string;
}

export type OutputUpdateTagDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
