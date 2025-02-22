import { TagProps } from '../entities/tag/tag.contact';

export interface ITagRepository {
  save(tag: TagProps): void | Promise<void>;
  remove(uuid: string): void | Promise<void>;
  findByUuid(uuid: string): null | TagProps | Promise<null | TagProps>;
}
