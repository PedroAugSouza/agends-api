import { Module } from '@nestjs/common';
import { GetAllNotificationsController } from 'src/ui/controllers/notifications/get-all-notifications.controller';
import { GetAllNotificationsService } from './get-all/get-all-notifications.service';

@Module({
  controllers: [GetAllNotificationsController],
  providers: [GetAllNotificationsService],
})
export class NotificationQueriesModule {}
