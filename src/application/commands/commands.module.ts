import { Module } from '@nestjs/common';
import { TagsCommandsModule } from './tags/tags-commands.module';

@Module({
  imports: [TagsCommandsModule],
})
export class CommandsModule {}
