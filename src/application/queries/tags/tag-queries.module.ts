import { Module } from '@nestjs/common';
import { GetAllTagsService } from './get-all/get-all-tags.service';
import { GetAllTagsController } from 'src/ui/controllers/tags/get-all-tags.controller';
import { GetTagByUuidService } from './get-by-uuid/get-tag-by-uuid.service';
import { GetTagByUuidController } from 'src/ui/controllers/tags/get-tag-by-uuid.controller';

@Module({
  providers: [GetAllTagsService, GetTagByUuidService],
  controllers: [GetAllTagsController, GetTagByUuidController],
})
export class TagsQueriesModule {}
