import { UserProps } from 'src/domain/entities/user/user.contact';
import { User } from 'src/domain/entities/user/user.entity';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';

export const getUserDummy = () => {
  const dateBirth = new Date();

  dateBirth.setFullYear(2005);

  const user = new User({
    name: 'John Doe',
    email: 'johndoe@teste.com',
    password: '123456789',
    status: UserStatusValueObject.ENABLE,
    dateBirth,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return user.result.value as UserProps;
};
