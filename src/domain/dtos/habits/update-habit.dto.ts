import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'Input Update Habit' })
export class InputUpdateHabitDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty({ nullable: true })
  name?: string;

  @ApiProperty({ nullable: true })
  color?: string;

  @ApiProperty({ nullable: true })
  userUuid?: string;

  @ApiProperty({ nullable: true })
  dayHabit?: number[];
}
