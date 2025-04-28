import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getUserDummy } from '__test__dummy/mock/mock.entities';

import { AuthenticateUserUseCase } from 'src/application/auth/authenticate/authenticate-user.use-case';
import { DiRepository } from 'src/domain/constants/di.constants';
import { SECRET } from 'src/domain/constants/jwt-constants';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';

import { describe, beforeAll, it, expect } from 'vitest';

describe('authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepository: IUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        InMemoryRepositoriesModule,
        JwtModule.register({
          global: true,
          secret: SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthenticateUserUseCase],
    }).compile();

    authenticateUserUseCase = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase,
    );

    usersRepository = module.get<IUserRepository>(DiRepository.USERS);

    usersRepository.save({
      ...getUserDummy(),
      email: 'user@email.com',
      password: 'password-correct',
    });
  });

  it(`should be able to a authenticate a user`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@email.com',
      password: 'password-correct',
    });

    console.log(result.value);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf('object');
  });

  it(`shouldn't be able to a authenticate a user if password incorrect`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@email.com',
      password: 'incorrect',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(ParamInvalidError);
  });
  it(`shouldn't be able to a authenticate a user not exist`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user-not-exist@example.com',
      password: 'incorrect',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserNotfoundError);
  });

  it(`shouldn't be able to a authenticate a user if param 'password' is missing`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'user@email.com',
      password: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able to a authenticate a user if param 'email' is missing`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: '',
      password: 'password-correct',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
});
