import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagsUseCase } from './create-tags.use-case';
import { InputCreateTagDTO } from 'src/domain/dtos/tags/create-tag.dto';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { IError } from 'src/infra/error/error';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('Create Tag Controller')
export class CreateTagsController {
  constructor(private readonly createTagUseCase: CreateTagsUseCase) {}

  @Post()
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
    status: 201,
    description: 'Tag created',
  })
  async handle(@Body() body: InputCreateTagDTO) {
    const result = await this.createTagUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof UserNotfoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof ParamInvalidError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    return result.value;
  }
}
