import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetHabitByUuidService } from './get-habit-by-uuid.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/auth/auth.guard';
import { OutputGetHabitByUuidDTO } from 'src/domain/dtos/habits/get-habit-by-uuid.dto';
import { IError } from 'src/infra/error/error';

@Controller('habit')
@ApiBearerAuth()
@ApiTags('Get Habit By Uuid')
@UseGuards(AuthGuard)
export class GetHabitByUuidController {
  constructor(private readonly getHabitByUuidService: GetHabitByUuidService) {}

  @Get('/:uuid')
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
  async handle(@Param('uuid') uuid: string) {
    const habit = await this.getHabitByUuidService.execute({ uuid });

    return habit;
  }
}
