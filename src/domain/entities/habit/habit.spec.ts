import { getHabitDummy } from '__test__dummy/mock/mock.entities';
import { describe, it, expect } from 'vitest';
import { Habit } from './habit.entity';

describe('Create habit entity: ', () => {
  const mockHabit = getHabitDummy();

  it(`should be able to create a new habit`, () => {
    const habit = new Habit(mockHabit, mockHabit.uuid);

    expect(habit.result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to create a new habit if the day is repeat`, () => {
    const habit = new Habit(
      {
        ...mockHabit,
        dayHabit: [1, 1, 2],
      },
      mockHabit.uuid,
    );

    expect(habit.result.isRight()).toBeFalsy();
  });
});
