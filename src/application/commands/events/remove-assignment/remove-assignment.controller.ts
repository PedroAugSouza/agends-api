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

@Controller('remove-assignment')
export class RemoveAssignmentController {
  constructor(
    private readonly removeAssignmentUseCase: RemoveAssignmentUseCase,
  ) {}

  @Delete('/:userUuid/:eventUuid')
  async handle(
    @Param('userUuid') userUuid: string,
    @Param('eventUuid') eventUuid: string,
  ) {
    const result = await this.removeAssignmentUseCase.execute({
      userUuid,
      eventUuid,
    });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof EventNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}
