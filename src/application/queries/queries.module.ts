import { Module } from '@nestjs/common';
import { TagsQueriesModule } from './tags/tag-queries.module';

@Module({
  imports: [TagsQueriesModule],
})
export class QueriesModule {}
