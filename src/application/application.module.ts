import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports: [CommandsModule, PrismaModule],
})
export class AppModule {}
