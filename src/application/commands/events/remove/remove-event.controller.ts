import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';

import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { RemoveEventUseCase } from './remove-event.use-case';

@Controller('event')
@ApiTags('Remove Event')
@ApiBearerAuth()
export class RemoveEventsController {
  constructor(private readonly removeEventUseCase: RemoveEventUseCase) {}

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
    description: 'Event Removed',
  })
  async handle(@Param('uuid') uuid: string) {
    const result = await this.removeEventUseCase.execute({ uuid });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}
