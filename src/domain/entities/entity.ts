import { randomUUID } from 'crypto';
import { EntityProps } from './props';
import { ApiProperty } from '@nestjs/swagger';

export abstract class Entity<T extends EntityProps> {
  @ApiProperty({ nullable: true })
  public _uuid?: string;
  public readonly props: T;

  constructor(props: T, uuid?: string) {
    Object.assign(this.props, props);

    if (!uuid) {
      this._uuid = randomUUID();
      return;
    }
    this._uuid = uuid;
  }

  public toValue() {
    return {
      _uuid: this._uuid,
      ...this.props,
    };
  }
}
