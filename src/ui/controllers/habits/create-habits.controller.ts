import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHabitsUseCase } from 'src/application/commands/habits/create/create-habits.use-case';

import { InputCreateHabitDTO } from 'src/application/dtos/habits/create-habit.dto';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@Controller('habit')
@ApiTags('Create Habit')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CreateHabitController {
  constructor(private readonly createHabitsUseCase: CreateHabitsUseCase) {}

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
    description: 'Habit created',
  })
  async handle(@Body() body: InputCreateHabitDTO) {
    const result = await this.createHabitsUseCase.execute({ ...body });

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
