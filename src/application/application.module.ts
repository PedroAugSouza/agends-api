import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { PrismaRepositoriesModule } from 'src/infra/repositories/prisma-repositories.module';
import { AuthModule } from './auth/auth.module';
import { QueriesModule } from './queries/queries.module';
import { GatewaysModule } from './gateways/gateways.module';

@Module({
  imports: [
    CommandsModule,
    PrismaModule,
    PrismaRepositoriesModule,
    AuthModule,
    QueriesModule,
    GatewaysModule,
  ],
})
export class AppModule {}
