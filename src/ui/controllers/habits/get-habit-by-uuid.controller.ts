import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { OutputGetHabitByUuidDTO } from 'src/application/dtos/habits/get-habit-by-uuid.dto';
import { IError } from 'src/domain/error/error';
import { GetHabitByUuidService } from 'src/application/queries/habits/get-by-uuid/get-habit-by-uuid.service';

@Controller('habit')
@ApiBearerAuth()
@ApiTags('Get Habit By Uuid')
@UseGuards(AuthGuard)
export class GetHabitByUuidController {
  constructor(private readonly getHabitByUuidService: GetHabitByUuidService) {}

  @Get('/by/:uuid')
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
