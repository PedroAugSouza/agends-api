import { Module } from '@nestjs/common';
import { CreateTagsController } from './create/create-tags.controller';
import { RemoveTagsController } from './remove/remove-tags.controller';
import { CreateTagsUseCase } from './create/create-tags.use-case';
import { RemoveTagsUseCase } from './remove/remove-tags.use-case';

@Module({
  providers: [CreateTagsUseCase, RemoveTagsUseCase],
  controllers: [CreateTagsController, RemoveTagsController],
})
export class TagsCommandsModule {}
