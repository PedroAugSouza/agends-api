import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InputUpdateHabitDTO } from 'src/application/dtos/habits/update-habit.dto';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { UpdateHabitsUseCase } from 'src/application/commands/habits/update/update-habits.use-case';

@Controller('habit')
@ApiTags('Update Habit')
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
