import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputRemoveHabitDTO,
  OutputRemoveHabitDTO,
} from 'src/domain/dtos/habits/remove-habit.dto';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class RemoveHabitsUseCase
  implements IUseCase<InputRemoveHabitDTO, OutputRemoveHabitDTO>
{
  constructor(
    @Inject(DiRepository.HABITS)
    private readonly habitsRepository: IHabitRepository,
  ) {}
  async execute(input: InputRemoveHabitDTO): Promise<OutputRemoveHabitDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      this.habitsRepository.remove(input.uuid);

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
