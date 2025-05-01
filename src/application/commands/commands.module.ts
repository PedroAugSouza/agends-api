import { Module } from '@nestjs/common';
import { TagsCommandsModule } from './tags/tags-commands.module';
import { HabitsCommandsModule } from './habits/habits-commands.module';
import { EventsCommandsModule } from './events/events-commands.module';
import { NotificationCommandsModule } from './notifications/notification-commands.module';

@Module({
  imports: [
    TagsCommandsModule,
    HabitsCommandsModule,
    EventsCommandsModule,
    NotificationCommandsModule,
  ],
})
export class CommandsModule {}
