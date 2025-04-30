import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';

import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { RemoveAssignmentUseCase } from 'src/application/commands/events/remove-assignment/remove-assignment.use-case';

@Controller('remove-assignment')
@ApiTags('Remove Assignment')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
