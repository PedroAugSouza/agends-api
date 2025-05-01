import { Module } from '@nestjs/common';
import { TagsQueriesModule } from './tags/tag-queries.module';
import { HabitQueriesModule } from './habits/habit-queries.modul';
import { EventsQueriesModule } from './events/events-queries.module';
import { NotificationQueriesModule } from './notifications/notification-queries.module';

@Module({
  imports: [
    TagsQueriesModule,
    HabitQueriesModule,
    EventsQueriesModule,
    NotificationQueriesModule,
  ],
})
export class QueriesModule {}
