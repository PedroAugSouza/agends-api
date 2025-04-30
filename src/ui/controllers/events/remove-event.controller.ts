import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';

import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';

import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { RemoveEventUseCase } from 'src/application/commands/events/remove/remove-event.use-case';

@Controller('event')
@UseGuards(AuthGuard)
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

    if (result.value instanceof EventNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}
