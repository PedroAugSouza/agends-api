import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InputUpdateHabitDTO } from 'src/domain/dtos/habits/update-habit.dto';
import { UpdateHabitsUseCase } from './update-habits.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { AuthGuard } from 'src/infra/auth/auth.guard';

@Controller('habit')
@ApiTags('Update Habit Controller')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UpdateHabitController {
  constructor(private readonly updateHabitsUseCase: UpdateHabitsUseCase) {}

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
    description: 'Habit Updated',
  })
  async handle(@Body() body: InputUpdateHabitDTO) {
    const result = await this.updateHabitsUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}
