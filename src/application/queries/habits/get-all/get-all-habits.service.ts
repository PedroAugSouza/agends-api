import { Injectable } from '@nestjs/common';
import {
  InputGetAllHabitsDTO,
  OutputGetAllHabitsDTO,
} from 'src/application/dtos/habits/get-all-habits.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUseCase } from 'src/domain/use-case/shared/use-case';

@Injectable()
export class GetAllHabitsService
  implements IUseCase<InputGetAllHabitsDTO, OutputGetAllHabitsDTO[]>
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(input: InputGetAllHabitsDTO): Promise<OutputGetAllHabitsDTO[]> {
    const habits = await this.prisma.habit.findMany({
      where: {
        userUuid: input.userUuid,
      },
    });

    return habits.map((habit) => ({
      color: habit.color,
      name: habit.name,
      userUuid: habit.userUuid,
    }));
  }
}
