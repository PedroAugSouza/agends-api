import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateHabitsUseCase } from './create-habits.use-case';
import { InputCreateHabitDTO } from 'src/domain/dtos/habits/create-habit.dto';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { IError } from 'src/infra/error/error';
import { AuthGuard } from 'src/infra/auth/auth.guard';

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
