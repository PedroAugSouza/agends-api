import { EventProps } from 'src/domain/entities/event/event.contact';
import { Event } from 'src/domain/entities/event/event.entity';
import { HabitProps } from 'src/domain/entities/habit/habit.contact';
import { Habit } from 'src/domain/entities/habit/habit.entity';
import { TagProps } from 'src/domain/entities/tag/tag.contact';
import { Tag } from 'src/domain/entities/tag/tag.entity';
import { UserProps } from 'src/domain/entities/user/user.contact';
import { User } from 'src/domain/entities/user/user.entity';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';

export const getUserDummy = () => {
  const dateBirth = new Date();

  dateBirth.setFullYear(2005);

  const user = new User({
    name: 'John Doe',
    email: 'johndoe@test.com',
    password: '123456789',
    status: UserStatusValueObject.ENABLE,
    dateBirth,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return user.result.value as UserProps;
};

export const getEventDummy = () => {
  const event = new Event({
    allDay: true,
    name: 'event test',
    createdAt: new Date(),
    updatedAt: new Date(),
    tagUuid: getTagDummy().uuid,
  });

  return event.result.value as EventProps;
};

export const getTagDummy = () => {
  const tag = new Tag({
    name: 'test',
    userUuid: getUserDummy().uuid,
    color: '#10b981',
  });
  return tag.result.value as TagProps;
};

export const getHabitDummy = () => {
  const habit = new Habit({
    name: 'test',
    color: '#10b981',
    dayHabit: [0, 1, 2],
    userUuid: getUserDummy().uuid,
  });

  return habit.result.value as HabitProps;
};
