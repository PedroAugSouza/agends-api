import { Module } from '@nestjs/common';
import { TagsQueriesModule } from './tags/tag-queries.module';
import { HabitQueriesModule } from './habits/habit-queries.modul';

@Module({
  imports: [TagsQueriesModule, HabitQueriesModule],
})
export class QueriesModule {}
