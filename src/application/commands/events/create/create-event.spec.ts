import { describe, beforeAll, it, expect } from 'vitest';
import { CreateEventUseCase } from './create-event.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { getEventDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { setHours } from 'date-fns';

describe('Create Event Use Case:', () => {
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

  it('should not create event without name', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      name: '',
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should not create event without user uuid', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: '',
    });
    expect(result.isRight()).toBeFalsy();
  });
  it('should not create event without tag uuid', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      tagUuid: '',
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should not create event without all day param', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      allDay: null,
    });
    expect(result.isRight()).toBeFalsy();
  });

  it(`shoudn't be able to create a new event if user not exists`, async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: 'inextent user',
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should not create event without date', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      date: null,
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should not create event with invalid date', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      date: null,
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should not create event with end time before start time', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      startsOf: setHours(new Date(), 15),
      endsOf: setHours(new Date(), 14),
    });
    expect(result.isRight()).toBeFalsy();
  });

  it('should create all-day event without start/end times', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      allDay: true,
      startsOf: null,
      endsOf: null,
    });

    expect(result.isRight()).toBeTruthy();
  });
});
