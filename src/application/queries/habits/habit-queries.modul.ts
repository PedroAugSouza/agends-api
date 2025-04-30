import { Module } from '@nestjs/common';
import { GetAllHabitsService } from './get-all/get-all-habits.service';
import { GetHabitByUuidService } from './get-by-uuid/get-habit-by-uuid.service';
import { GetAllHabitsController } from 'src/ui/controllers/habits/get-all-habits.controller';
import { GetHabitByUuidController } from 'src/ui/controllers/habits/get-habit-by-uuid.controller';

@Module({
  providers: [GetAllHabitsService, GetHabitByUuidService],
  controllers: [GetAllHabitsController, GetHabitByUuidController],
})
export class HabitQueriesModule {}
