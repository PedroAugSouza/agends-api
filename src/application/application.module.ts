import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { PrismaRepositoriesModule } from 'src/infra/repositories/prisma-repositories.module';

@Module({
  imports: [CommandsModule, PrismaModule, PrismaRepositoriesModule],
})
export class AppModule {}
