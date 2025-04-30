import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputUpdateHabitDTO,
  OutputUpdateHabitDTO,
} from 'src/application/dtos/habits/update-habit.dto';
import { Habit } from 'src/domain/entities/habit/habit.entity';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class UpdateHabitsUseCase
  implements IUseCase<InputUpdateHabitDTO, OutputUpdateHabitDTO>
{
  constructor(
    @Inject(DiRepository.HABITS)
    private readonly habitsRepository: IHabitRepository,
  ) {}

  async execute(input: InputUpdateHabitDTO): Promise<OutputUpdateHabitDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      const alreadyExistHabit = await this.habitsRepository.findByUuid(
        input.uuid,
      );

      const newHabit = new Habit(
        {
          ...input,
          ...alreadyExistHabit,
        },
        input.uuid,
      );

      if (newHabit.result.value instanceof ParamInvalidError)
        return left(newHabit.result.value);

      await this.habitsRepository.update(newHabit.result.value);

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
