import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateTagDTO } from 'src/application/dtos/tags/create-tag.dto';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { CreateTagsUseCase } from 'src/application/commands/tags/create/create-tags.use-case';

@Controller('tag')
@ApiBearerAuth()
@ApiTags('Create Tag')
@UseGuards(AuthGuard)
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
