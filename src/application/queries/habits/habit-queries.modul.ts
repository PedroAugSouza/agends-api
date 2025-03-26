import { Module } from '@nestjs/common';
import { GetAllHabitsService } from './get-all/get-all-habits.service';
import { GetHabitByUuidService } from './get-by-uuid/get-habit-by-uuid.service';
import { GetAllHabitsController } from './get-all/get-all-habits.controller';
import { GetHabitByUuidController } from './get-by-uuid/get-habit-by-uuid.controller';

@Module({
  providers: [GetAllHabitsService, GetHabitByUuidService],
  controllers: [GetAllHabitsController, GetHabitByUuidController],
})
export class HabitQueriesModule {}
