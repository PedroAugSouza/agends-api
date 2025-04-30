import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { Either } from 'src/infra/utils/either/either';

@ApiSchema({ name: 'Input Update User' })
export class InputUpdateUserDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  email?: string;

  @ApiProperty({ nullable: true })
  password?: string;

  @ApiProperty({ nullable: true })
  dateBirth?: Date;
}

export type OutputUpdateUserDTO = Either<
  MissingParamError | UnexpectedError,
  void
>;
