import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RegisterUserUseCase } from './register-user.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { getUserDummy } from '__test__dummy/mock/mock.entities';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';

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
  });

  it(`shoudn't be able to create a new user if that user already exists`, async () => {
    userRepository.save(mockUser);

    const result = await registerUserUseCase.execute(mockUser);

    expect(result.isRight()).toBeFalsy();
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
      password: '',
    });

    expect(result.isRight()).toBeFalsy();
  });
  it(`shoudn't be able to crate a new user if the date birth param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      dateBirth: null,
    });

    expect(result.isRight()).toBeFalsy();
  });
  it(`shoudn't be able to crate a new user if the name param is missing`, async () => {
    const result = await registerUserUseCase.execute({
      ...mockUser,
      name: '',
    });

    expect(result.isRight()).toBeFalsy();
  });
});
