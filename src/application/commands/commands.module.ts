import { Module } from '@nestjs/common';
import { TagsCommandsModule } from './tags/tags-commands.module';
import { HabitsCommandsModule } from './habits/habits-commands.module';

@Module({
  imports: [TagsCommandsModule, HabitsCommandsModule],
})
export class CommandsModule {}
