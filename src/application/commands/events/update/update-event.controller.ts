import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateEventUseCase } from './update-event.use-case';
import { InputUpdateEventDTO } from 'src/domain/dtos/events/update-event.dto';
import { IError } from 'src/infra/error/error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { InvalidTimeError } from 'src/domain/errors/events/invalid-time.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';

@Controller('event')
@ApiTags('Update Event')
@ApiBearerAuth()
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
