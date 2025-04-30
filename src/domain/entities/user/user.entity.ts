import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { Entity } from '../entity';
import { UserProps } from './user.contact';
import { Left, Right } from 'src/infra/utils/either/either';

export class User extends Entity<UserProps> {
  constructor(props: UserProps, uuid?: string) {
    super();

    if (props.password.length < 8) {
      this.result = new Left(
        new ParamInvalidError(
          'Password invalid, has less than eight catacters',
        ),
      );
      return;
    }

    const now = new Date();

    if (now.getFullYear() - props.dateBirth.getFullYear() <= 12) {
      this.result = new Left(
        new ParamInvalidError('User not has more than twelve years'),
      );
      return;
    }

    this.create(props, uuid);
    this.result = new Right(this.toValue());
  }
}
