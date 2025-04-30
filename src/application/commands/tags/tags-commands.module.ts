import { Module } from '@nestjs/common';

import { CreateTagsUseCase } from './create/create-tags.use-case';
import { RemoveTagsUseCase } from './remove/remove-tags.use-case';
import { CreateTagsController } from 'src/ui/controllers/tags/create-tags.controller';
import { RemoveTagsController } from 'src/ui/controllers/tags/remove-tags.controller';

@Module({
  providers: [CreateTagsUseCase, RemoveTagsUseCase],
  controllers: [CreateTagsController, RemoveTagsController],
})
export class TagsCommandsModule {}
