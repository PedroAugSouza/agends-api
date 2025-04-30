import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { IError } from 'src/domain/error/error';
import { OutputGetAllEventsDTO } from 'src/application/dtos/events/get-all-events.dto';
import { GetAllEventsService } from 'src/application/queries/events/get-all/get-all-events.service';

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
