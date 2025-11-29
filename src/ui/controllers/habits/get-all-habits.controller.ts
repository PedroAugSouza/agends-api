import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';
import { OutputGetAllHabitsDTO } from 'src/application/dtos/habits/get-all-habits.dto';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { GetAllHabitsService } from 'src/application/queries/habits/get-all/get-all-habits.service';

@Controller('habit')
@ApiBearerAuth()
@ApiTags('Get All Habits')
@UseGuards(AuthGuard)
export class GetAllHabitsController {
  constructor(private readonly getAllHabitsService: GetAllHabitsService) {}

  @Get('/user/:userUuid')
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
