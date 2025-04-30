import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputCreateHabitDTO,
  OutputCreateHabitDTO,
} from 'src/application/dtos/habits/create-habit.dto';
import { Habit } from 'src/domain/entities/habit/habit.entity';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class CreateHabitsUseCase
  implements IUseCase<InputCreateHabitDTO, OutputCreateHabitDTO>
{
  constructor(
    @Inject(DiRepository.HABITS)
    private readonly habitsRepository: IHabitRepository,

    @Inject(DiRepository.USERS)
    private readonly usersRepository: IUserRepository,
  ) {}
  async execute(input: InputCreateHabitDTO): Promise<OutputCreateHabitDTO> {
    try {
      if (!input.color) return left(new MissingParamError('Color'));

      if (!input.dayHabit) return left(new MissingParamError('Day'));

      if (!input.name) return left(new MissingParamError('Name'));

      if (!input.userUuid) return left(new MissingParamError('user uuid'));

      const alreadyExistUser = await this.usersRepository.findByUuid(
        input.userUuid,
      );

      if (!alreadyExistUser) return left(new UserNotfoundError());

      const habit = new Habit(input);

      if (habit.result.value instanceof ParamInvalidError)
        return left(habit.result.value);

      this.habitsRepository.save(habit.result.value);

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
