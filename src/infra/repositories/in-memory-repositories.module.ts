import { Module } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import { InMemoryEventsRepository } from './events/in-memory-events.repository';
import InMemoryHabitsRepository from './habits/in-memory-habits.repository';
import { InMemoryTagsRepository } from './tags/in-memory-tags.repository';
import { InMemoryUsersRepository } from './users/in-memory-users.repository';
import { InMemoryNotificationsRepository } from './notifications/in-memory-notifications.reposiory';

@Module({
  providers: [
    {
      provide: DiRepository.EVENTS,
      useClass: InMemoryEventsRepository,
    },
    {
      provide: DiRepository.HABITS,
      useClass: InMemoryHabitsRepository,
    },
    {
      provide: DiRepository.TAGS,
      useClass: InMemoryTagsRepository,
    },
    {
      provide: DiRepository.USERS,
      useClass: InMemoryUsersRepository,
    },
    {
      provide: DiRepository.NOTIFICATIONS,
      useClass: InMemoryNotificationsRepository,
    },
  ],
  exports: [
    DiRepository.USERS,
    DiRepository.TAGS,
    DiRepository.HABITS,
    DiRepository.EVENTS,
    DiRepository.NOTIFICATIONS,
  ],
})
export class InMemoryRepositoriesModule {}
