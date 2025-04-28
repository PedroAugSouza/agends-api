import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RegisterUserUseCase } from './register-user.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { getUserDummy } from '__test__dummy/mock/mock.entities';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { UserAlreadyExistError } from 'src/domain/errors/users/user-already-exists.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';

describe('Register User Use Case: ', () => {
  let registerUserUseCase: RegisterUserUseCase;

  let userRepository: IUserRepository;

  const mockUser = getUserDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterUserUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);

    userRepository = module.get<IUserRepository>(DiRepository.USERS);
  });

  it(`should be able to create a new user`, async () => {
    const result = await registerUserUseCase.execute(mockUser);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it(`shoudn't be able to crate a new user if the email param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      email: '',
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shoudn't be able to crate a new user if the password param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      email: 'newuser@test.com',
      password: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shoudn't be able to crate a new user if the date birth param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      email: 'newuser@test.com',
      dateBirth: null,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it(`shoudn't be able to crate a new user if the name param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      email: 'newuser@test.com',
      name: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shoudn't be able to create a new user if that user already exists`, async () => {
    userRepository.save(mockUser);

    const result = await registerUserUseCase.execute(mockUser);

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserAlreadyExistError);
  });
});
