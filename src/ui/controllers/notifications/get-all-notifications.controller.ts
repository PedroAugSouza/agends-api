import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputGetAllNotificationsDTO } from 'src/application/dtos/notifications/get-all-notifiications.dto';
import { GetAllNotificationsService } from 'src/application/queries/notifications/get-all/get-all-notifications.service';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@Controller('notifications')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Get All Notifications')
export class GetAllNotificationsController {
  constructor(
    private readonly getAllNotificationsService: GetAllNotificationsService,
  ) {}

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
    description: 'Notifications finded',
    type: [OutputGetAllNotificationsDTO],
  })
  async handle(@Param('userUuid') userUuid: string) {
    const result = await this.getAllNotificationsService.execute({ userUuid });

    return result;
  }
}
