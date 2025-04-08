import { Module } from '@nestjs/common';
import { TagsCommandsModule } from './tags/tags-commands.module';
import { HabitsCommandsModule } from './habits/habits-commands.module';
import { EventsCommandsModule } from './events/events-commands.module';

@Module({
  imports: [TagsCommandsModule, HabitsCommandsModule, EventsCommandsModule],
})
export class CommandsModule {}
