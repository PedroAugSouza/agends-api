import { Injectable } from '@nestjs/common';
import { TagProps } from 'src/domain/entities/tag/tag.contact';
import { ITagRepository } from 'src/domain/repositories/tags.repository';

@Injectable()
export class InMemoryTagsRepository implements ITagRepository {
  private readonly tags: Map<string, TagProps> = new Map();

  save(tag: TagProps): void {
    this.tags.set(tag.uuid, tag);
  }
  remove(uuid: string): void {
    this.tags.delete(uuid);
  }
  findByUuid(uuid: string): null | TagProps {
    const tag = Array.from(this.tags.values()).filter(
      (tag) => tag.uuid === uuid,
    )[0];

    return tag;
  }
}
