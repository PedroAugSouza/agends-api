import { randomUUID } from 'crypto';
import { EntityProps } from './props';
import { Either } from 'src/infra/utils/either/either';
import { ParamInvalidError } from '../errors/shared/param-invalid.error';

export abstract class Entity<T extends EntityProps> {
  protected uuid: string;

  protected props: T = {} as T;

  public result: Either<ParamInvalidError, T>;

  protected create(props: T, uuid?: string) {
    Object.assign(this.props, props);

    if (!uuid) {
      this.uuid = randomUUID();
      return;
    }
    this.uuid = uuid;
  }

  protected toValue(): T {
    return {
      ...this.props,
      uuid: this.uuid,
    };
  }
}
