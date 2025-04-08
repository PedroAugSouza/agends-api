import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetAllEventsService } from './get-all-events.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/auth/auth.guard';
import { IError } from 'src/infra/error/error';
import { OutputGetAllEventsDTO } from 'src/domain/dtos/events/get-all-events.dto';

@Controller('events')
@ApiBearerAuth()
@ApiTags('Get All Events')
@UseGuards(AuthGuard)
export class GetAllEventsController {
  constructor(private readonly getAllEventsService: GetAllEventsService) {}

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
    description: 'Events finded',
    type: [OutputGetAllEventsDTO],
  })
  async handle(
    @Param('userUuid') uuid: string,
    @Query('date') currentMonth: string,
  ) {
    const result = await this.getAllEventsService.execute({
      userUuid: uuid,
      currentMonth: new Date(currentMonth),
    });

    return result;
  }
}
