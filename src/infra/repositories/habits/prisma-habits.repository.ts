import { Injectable } from '@nestjs/common';
import { HabitProps } from 'src/domain/entities/habit/habit.contact';
import { IHabitRepository } from 'src/domain/repositories/habit.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaHabitsRepository implements IHabitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(habit: HabitProps): Promise<void> {
    await this.prisma.habit.create({
      data: {
        color: habit.color,
        createdAt: new Date(),
        name: habit.color,
        updatedAt: new Date(),
        userUuid: habit.userUuid,
        ...habit.dayHabit.map((day) => {
          return {
            dayHabit: {
              create: {
                daysInWeek: {
                  connect: {
                    id: day,
                  },
                },
              },
            },
          };
        }),
      },
    });
  }
  async update(habit: HabitProps): Promise<void> {
    await this.prisma.habit.update({
      where: { uuid: habit.uuid },
      data: {
        color: habit.color,
        createdAt: new Date(),
        name: habit.color,
        updatedAt: new Date(),
        userUuid: habit.userUuid,
        ...habit.dayHabit.map((day) => {
          return {
            dayHabit: {
              create: {
                daysInWeek: {
                  connect: {
                    id: day,
                  },
                },
              },
            },
          };
        }),
      },
    });
  }
  async remove(uuid: string): Promise<void> {
    await this.prisma.habit.delete({
      where: {
        uuid,
      },
    });
  }
}
