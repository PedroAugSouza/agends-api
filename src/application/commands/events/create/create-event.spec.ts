import { describe, beforeAll, it, expect } from 'vitest';
import { CreateEventUseCase } from './create-event.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { getEventDummy, getUserDummy } from '__test__dummy/mock/mock.entities';

describe('Create Event Use Case: ', () => {
  let createEventUseCase: CreateEventUseCase;

  let usersRepository: IUserRepository;

  const mockUser = getUserDummy();

  const mockEvent = getEventDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateEventUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    createEventUseCase = module.get<CreateEventUseCase>(CreateEventUseCase);

    usersRepository = module.get<IUserRepository>(DiRepository.USERS);

    usersRepository.save(mockUser);
  });

  it(`should be able to create a new event`, async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
    });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shoudn't be able to create a new event if user not exits`, async () => {
    const result = await createEventUseCase.execute({
      allDay: mockEvent.allDay,
      date: mockEvent.date,
      name: mockEvent.name,
      tagUuid: mockEvent.uuid,
      userUuid: 'inexistent user',
      endsOf: mockEvent.endsOf,
      startsOf: mockEvent.startsOf,
    });

    expect(result.isRight()).toBeFalsy();
  });
});
