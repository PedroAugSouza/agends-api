import { Module } from '@nestjs/common';
import { MarkAsReadNotificationUsecase } from './mark-as-read/mark-as-read.use-case';
import { MarkAsReadNotificationController } from 'src/ui/controllers/notifications/mark-as-read-notification.controller';

@Module({
  providers: [MarkAsReadNotificationUsecase],
  controllers: [MarkAsReadNotificationController],
})
export class NotificationCommandsModule {}
