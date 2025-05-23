import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveTagsUseCase } from 'src/application/commands/tags/remove/remove-tags.use-case';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('Remove Tags')
@UseGuards(AuthGuard)
export class RemoveTagsController {
  constructor(private readonly removeTagUseCase: RemoveTagsUseCase) {}

  @Delete('/:uuid')
  @ApiResponse({
    status: '4XX',
    type: IError,
    description: 'Client error',
  })
  @ApiResponse({
    status: '5XX',
    type: IError,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Tag removed',
  })
  async handle(@Param('uuid') uuid: string) {
    const result = await this.removeTagUseCase.execute({ uuid });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}
