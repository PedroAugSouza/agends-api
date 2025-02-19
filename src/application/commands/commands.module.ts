import { Global, Module } from '@nestjs/common';
import { TagsCommandsModule } from './tags/tags-commands.module';

@Global()
@Module({
  imports: [TagsCommandsModule],
})
export class CommandsModule {}
