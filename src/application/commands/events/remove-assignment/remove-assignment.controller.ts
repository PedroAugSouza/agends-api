import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { RemoveAssignmentUseCase } from './remove-assignment.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { ApiResponse } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';

@Controller('remove-assignment')
export class RemoveAssignmentController {
  constructor(
    private readonly removeAssignmentUseCase: RemoveAssignmentUseCase,
  ) {}

  @Delete('/:userEmail/:eventUuid')
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
    description: 'Assignment Removed',
  })
  async handle(
    @Param('userEmail') userEmail: string,
    @Param('eventUuid') eventUuid: string,
  ) {
    const result = await this.removeAssignmentUseCase.execute({
      userEmail,
      eventUuid,
    });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof EventNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof UserNotfoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}
