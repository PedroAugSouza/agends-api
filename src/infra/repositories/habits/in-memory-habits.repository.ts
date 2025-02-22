import { Injectable } from '@nestjs/common';
import { HabitProps } from 'src/domain/entities/habit/habit.contact';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';

@Injectable()
export class InMemoryHabitsRepository implements IHabitRepository {
  private readonly habits: Map<string, HabitProps> = new Map();

  save(habit: HabitProps): void {
    this.habits.set(habit.uuid, habit);
  }
  update(habit: HabitProps): void {
    this.habits.set(habit.uuid, habit);
  }
  remove(uuid: string): void {
    this.habits.delete(uuid);
  }
  findByUuid(uuid: string): null | HabitProps {
    const habit = Array.from(this.habits.values()).filter(
      (habit) => habit.uuid === uuid,
    )[0];

    return habit;
  }
}
