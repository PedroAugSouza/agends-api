import { describe, beforeAll, it, expect } from 'vitest';
import { CreateHabitsUseCase } from './create-habits.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { getHabitDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';

describe('Create Habits Use Case: ', () => {
  let createHabitsUseCase: CreateHabitsUseCase;

  let usersRepository: IUserRepository;

  const mockHabit = getHabitDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateHabitsUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    createHabitsUseCase = module.get<CreateHabitsUseCase>(CreateHabitsUseCase);

    usersRepository = module.get<IUserRepository>(DiRepository.USERS);

    usersRepository.save(getUserDummy());
  });

  it(`should be able to create a new habit`, async () => {
    const result = await createHabitsUseCase.execute({
      color: mockHabit.color,
      dayHabit: mockHabit.dayHabit,
      name: mockHabit.name,
      userUuid: mockHabit.userUuid,
    });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to create a new habit if user not exist`, async () => {
    const result = await createHabitsUseCase.execute({
      color: mockHabit.color,
      dayHabit: mockHabit.dayHabit,
      name: mockHabit.name,
      userUuid: 'not exist user',
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to create new habit if the color param is missing`, async () => {
    const result = await createHabitsUseCase.execute({
      color: '',
      dayHabit: mockHabit.dayHabit,
      name: mockHabit.name,
      userUuid: mockHabit.userUuid,
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to create new habit if the day param is missing`, async () => {
    const result = await createHabitsUseCase.execute({
      dayHabit: null,
      color: mockHabit.color,
      name: mockHabit.name,
      userUuid: mockHabit.userUuid,
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to create new habit if the name param is missing`, async () => {
    const result = await createHabitsUseCase.execute({
      name: '',
      dayHabit: mockHabit.dayHabit,
      color: mockHabit.color,
      userUuid: mockHabit.userUuid,
    });

    expect(result.isRight()).toBeFalsy();
  });

  it(`shouldn't be able to create new habit if the color param is missing`, async () => {
    const result = await createHabitsUseCase.execute({
      userUuid: '',
      dayHabit: mockHabit.dayHabit,
      name: mockHabit.name,
      color: mockHabit.color,
    });

    expect(result.isRight()).toBeFalsy();
  });
});
