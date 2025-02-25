import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RemoveHabitsUseCase } from './remove-habits.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { getHabitDummy } from '__test__dummy/mock/mock.entities';
import { DiRepository } from 'src/domain/constants/di.constants';

describe('Remove Habits Use Case: ', () => {
  let habitsRepository: IHabitRepository;

  let removeHabitsUseCase: RemoveHabitsUseCase;

  const mockHabits = getHabitDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveHabitsUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    removeHabitsUseCase = module.get<RemoveHabitsUseCase>(RemoveHabitsUseCase);

    habitsRepository = module.get<IHabitRepository>(DiRepository.HABITS);

    habitsRepository.save(mockHabits);
  });

  it(`should be able to remove a habit`, async () => {
    const result = await removeHabitsUseCase.execute({ uuid: mockHabits.uuid });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to remove a habit if the uuid is missing `, async () => {
    const result = await removeHabitsUseCase.execute({ uuid: '' });

    expect(result.isRight()).toBeFalsy();
  });
});
