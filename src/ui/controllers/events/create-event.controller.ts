import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InputCreateEventDTO } from 'src/application/dtos/events/create-event.dto';
import { IError } from 'src/domain/error/error';

import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { InvalidTimeError } from 'src/infra/errors/events/invalid-time.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { CreateEventUseCase } from 'src/application/commands/events/create/create-event.use-case';

@Controller('event')
@ApiBearerAuth()
@ApiTags('Create Event')
@UseGuards(AuthGuard)
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
