import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { Entity } from '../entity';
import { UserProps } from './user.contact';
import { Left, Right } from 'src/infra/utils/either/either';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';

export class User extends Entity<UserProps> {
  constructor(props: UserProps, uuid?: string) {
    super();
    if (props.password.length < 8) {
      throw (this.value = new Left(
        new ParamInvalidError(
          'Password invalid, has less than eight catacters',
        ),
      ));
    }

    const now = new Date();

    if (now.getFullYear() - props.dateBirth.getFullYear() <= 12) {
      throw (this.value = new Left(
        new ParamInvalidError('User not has more than twelve years'),
      ));
    }

    this.create(props, uuid);
    this.value = new Right(this.toValue());
  }
}
