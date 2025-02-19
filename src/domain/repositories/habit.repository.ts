import { HabitProps } from '../entities/habit/habit.contact';

export interface IHabitRepository {
  save(habit: HabitProps): void | Promise<void>;
  update(habit: HabitProps): void | Promise<void>;
  remove(uuid: string): void | Promise<void>;
}
