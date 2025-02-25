import { Module } from '@nestjs/common';
import { CreateHabitsUseCase } from './create/create-habits.use-case';
import { RemoveHabitsUseCase } from './remove/remove-habits.use-case';
import { UpdateHabitsUseCase } from './update/update-habits.use-case';
import { CreateHabitController } from './create/create-habits.controller';
import { RemoveHabitsController } from './remove/remove-habits.controller';
import { UpdateHabitController } from './update/update-habit.controller';

@Module({
  providers: [CreateHabitsUseCase, RemoveHabitsUseCase, UpdateHabitsUseCase],
  controllers: [
    CreateHabitController,
    RemoveHabitsController,
    UpdateHabitController,
  ],
})
export class HabitsCommandsModule {}
