import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemoveTagsUseCase } from './remove-tags.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { IError } from 'src/infra/error/error';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('Remove Tags Controller')
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
