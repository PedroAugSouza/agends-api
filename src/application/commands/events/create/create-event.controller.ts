import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateEventDTO } from 'src/domain/dtos/events/create-event.dto';
import { IError } from 'src/infra/error/error';
import { CreateEventUseCase } from './create-event.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { InvalidTimeError } from 'src/domain/errors/events/invalid-time.error';

@Controller('event')
@ApiBearerAuth()
@ApiTags('Create Event')
export class CreateEventController {
  constructor(private readonly createEventUseCase: CreateEventUseCase) {}

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
    description: 'Event created',
  })
  async handle(@Body() body: InputCreateEventDTO) {
    const result = await this.createEventUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof UserNotfoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof ParamInvalidError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof InvalidTimeError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    return result.value;
  }
}
