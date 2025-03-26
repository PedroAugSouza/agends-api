import { Controller, Get, Param } from '@nestjs/common';
import { GetAllHabitsService } from './get-all-habits.service';
import { ApiResponse } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { OutputGetHabitByUuidDTO } from 'src/domain/dtos/habits/get-habit-by-uuid.dto';

@Controller('habit')
export class GetAllHabitsController {
  constructor(private readonly getAllHabitsService: GetAllHabitsService) {}

  @Get('/:userUuid')
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
    description: 'Habit finded',
    type: OutputGetHabitByUuidDTO,
  })
  async handle(@Param('userUuid') uuid: string) {
    const result = await this.getAllHabitsService.execute({ userUuid: uuid });

    return result;
  }
}
