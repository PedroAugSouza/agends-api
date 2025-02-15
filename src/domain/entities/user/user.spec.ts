import { describe, it, expect } from 'vitest';
import { User } from './user.entity';
import { getUserDummy } from '__test__dummy/mock/mock.entities';

describe('Create user entity: ', () => {
  const mockUser = getUserDummy();

  it(`should be able to a create a new user`, () => {
    const user = new User(mockUser, mockUser.uuid);

    expect(user.result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to a create a new user if password has less than eight caracters`, () => {
    const user = new User(
      {
        ...mockUser,
        password: '1234',
      },
      mockUser.uuid,
    );

    expect(user.result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to a create a new user if age is less than twelve years`, () => {
    const user = new User(
      {
        ...mockUser,
        dateBirth: new Date(),
      },
      mockUser.uuid,
    );

    expect(user.result.isRight()).toBeFalsy();
  });
});
