import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { InputUpdateEventDTO } from 'src/application/dtos/events/update-event.dto';
import { IError } from 'src/domain/error/error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { InvalidTimeError } from 'src/infra/errors/events/invalid-time.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { UpdateEventUseCase } from 'src/application/commands/events/update/update-event.use-case';

@Controller('event')
@ApiTags('Update Event')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UpdateEventController {
  constructor(private readonly updateEventUseCase: UpdateEventUseCase) {}

  @Patch()
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
    description: 'Event Updated',
  })
  async handle(@Body() body: InputUpdateEventDTO) {
    const result = await this.updateEventUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof InvalidTimeError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof ParamInvalidError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof EventNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}
