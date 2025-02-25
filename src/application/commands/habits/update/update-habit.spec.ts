import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';

import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { getHabitDummy } from '__test__dummy/mock/mock.entities';
import { DiRepository } from 'src/domain/constants/di.constants';
import { UpdateHabitsUseCase } from './update-habits.use-case';

describe('Update Habits Use Case: ', () => {
  let habitsRepository: IHabitRepository;

  let updateHabitsUseCase: UpdateHabitsUseCase;

  const mockHabits = getHabitDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateHabitsUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    updateHabitsUseCase = module.get<UpdateHabitsUseCase>(UpdateHabitsUseCase);

    habitsRepository = module.get<IHabitRepository>(DiRepository.HABITS);

    habitsRepository.save(mockHabits);
  });

  it(`should be able to update a habit`, async () => {
    const result = await updateHabitsUseCase.execute({
      uuid: mockHabits.uuid,
      name: 'habit updated',
    });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to update a habit if the uuid is missing `, async () => {
    const result = await updateHabitsUseCase.execute({
      uuid: '',
      name: 'habit updated',
    });

    expect(result.isRight()).toBeFalsy();
  });
});
