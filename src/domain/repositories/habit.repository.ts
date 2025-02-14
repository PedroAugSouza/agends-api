import { HabitProps } from '../entities/habit/habit.contact';

export interface IHabitRepository {
  save(habit: HabitProps): void;
  update(habit: HabitProps): void;
  remove(uuid: string): void;
}
