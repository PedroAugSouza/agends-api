import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputGetHabitByUuidDTO,
  OutputGetHabitByUuidDTO,
} from 'src/domain/dtos/habits/get-habit-by-uuid.dto';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';

@Injectable()
export class GetHabitByUuidService {
  constructor(
    @Inject(DiRepository.HABITS)
    private readonly habitsRepository: IHabitRepository,
  ) {}

  async execute(
    data: InputGetHabitByUuidDTO,
  ): Promise<OutputGetHabitByUuidDTO> {
    const habit = await this.habitsRepository.findByUuid(data.uuid);

    if (!habit) {
      return null;
    }

    return {
      color: habit.color,
      name: habit.name,
      uuid: habit.uuid,
      dayHabit: habit.dayHabit,
      userUuid: habit.userUuid,
    };
  }
}
