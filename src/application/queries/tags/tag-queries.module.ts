import { Module } from '@nestjs/common';
import { GetAllTagsService } from './get-all/get-all-tags.service';
import { GetAllTagsController } from './get-all/get-all-tags.controller';

@Module({
  providers: [GetAllTagsService],
  controllers: [GetAllTagsController],
})
export class TagsQueriesModule {}
