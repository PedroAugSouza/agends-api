import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetAllHabitsService } from './get-all-habits.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { OutputGetAllHabitsDTO } from 'src/domain/dtos/habits/get-all-habits.dto';
import { AuthGuard } from 'src/infra/auth/auth.guard';

@Controller('habit')
@ApiBearerAuth()
@ApiTags('Get All Habits')
@UseGuards(AuthGuard)
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
    type: [OutputGetAllHabitsDTO],
  })
  async handle(@Param('userUuid') uuid: string) {
    const result = await this.getAllHabitsService.execute({ userUuid: uuid });

    return result;
  }
}
