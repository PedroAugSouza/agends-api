import { Global, Module } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import PrismaEventsRepository from './events/prisma-events.repository';
import { PrismaHabitsRepository } from './habits/prisma-habits.repository';
import { PrismaTagsRepository } from './tags/prisma-tags.respository';
import { PrismaUsersRepository } from './users/prisma.habits.repository';

@Global()
@Module({
  providers: [
    {
      provide: DiRepository.EVENTS,
      useClass: PrismaEventsRepository,
    },
    {
      provide: DiRepository.HABITS,
      useClass: PrismaHabitsRepository,
    },
    {
      provide: DiRepository.TAGS,
      useClass: PrismaTagsRepository,
    },
    {
      provide: DiRepository.USERS,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    DiRepository.EVENTS,
    DiRepository.HABITS,
    DiRepository.TAGS,
    DiRepository.USERS,
  ],
})
export class PrismaRepositoriesModule {}
