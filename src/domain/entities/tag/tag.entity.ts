import { Right } from 'src/infra/utils/either/either';
import { Entity } from '../entity';
import { TagProps } from './tag.contact';

export class Tag extends Entity<TagProps> {
  constructor(props: TagProps, uuid?: string) {
    super();

    this.create(props, uuid);

    this.result = new Right(this.toValue());
  }
}
