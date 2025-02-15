import { Left, Right } from 'src/infra/utils/either/either';
import { Entity } from '../entity';
import { HabitProps } from './habit.contact';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';

export class Habit extends Entity<HabitProps> {
  private hasDuplicate(array: number[]) {
    return new Set(array).size !== array.length;
  }
  constructor(props: HabitProps, uuid?: string) {
    super();

    if (this.hasDuplicate(props.dayHabit)) {
      this.result = new Left(
        new ParamInvalidError('it is not possible to repeat the days'),
      );
      return;
    }

    this.create(props, uuid);

    this.result = new Right(this.toValue());
  }
}
