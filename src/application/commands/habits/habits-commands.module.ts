import { Module } from '@nestjs/common';
import { CreateHabitsUseCase } from './create/create-habits.use-case';
import { RemoveHabitsUseCase } from './remove/remove-habits.use-case';
import { UpdateHabitsUseCase } from './update/update-habits.use-case';
import { CreateHabitController } from 'src/ui/controllers/habits/create-habits.controller';
import { RemoveHabitsController } from 'src/ui/controllers/habits/remove-habits.controller';
import { UpdateHabitController } from 'src/ui/controllers/habits/update-habit.controller';

@Module({
  providers: [CreateHabitsUseCase, RemoveHabitsUseCase, UpdateHabitsUseCase],
  controllers: [
    CreateHabitController,
    RemoveHabitsController,
    UpdateHabitController,
  ],
})
export class HabitsCommandsModule {}
