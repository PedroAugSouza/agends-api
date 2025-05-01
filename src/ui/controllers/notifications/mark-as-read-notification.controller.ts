import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarkAsReadNotificationUsecase } from 'src/application/commands/notifications/mark-as-read/mark-as-read.use-case';
import { IError } from 'src/domain/error/error';
import { NotificationNotFoundError } from 'src/infra/errors/notifications/notification-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { AuthGuard } from 'src/ui/auth/auth.guard';

@Controller('notification/mask-as-read')
@UseGuards(AuthGuard)
@ApiTags('Mark As Read Notification')
@ApiBearerAuth()
export class MarkAsReadNotificationController {
  constructor(
    private readonly markaAsReadNotification: MarkAsReadNotificationUsecase,
  ) {}
  @Patch('/:uuid')
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
    description: 'Notification is read',
  })
  async handle(@Param('uuid') uuid: string) {
    const result = await this.markaAsReadNotification.execute({ uuid });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof NotificationNotFoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    return result.value;
  }
}
