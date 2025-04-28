import { describe, beforeAll, it, expect } from 'vitest';
import { CreateEventUseCase } from './create-event.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { getEventDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { setHours } from 'date-fns';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';

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

  it('should be able to create a new event', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
    });
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it('should not create event without name', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      name: '',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it('should not create event without user uuid', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: '',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });
  it('should not create event without tag uuid', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      tagUuid: '',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it('should not create event without all day param', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      allDay: null,
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shoudn't be able to create a new event if user not exists`, async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: 'inextent user',
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserNotfoundError);
  });

  it('should not create event without date', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      date: null,
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it('should not create event with end time before start time', async () => {
    const result = await createEventUseCase.execute({
      ...mockEvent,
      userUuid: mockUser.uuid,
      startsOf: setHours(new Date(), 15),
      endsOf: setHours(new Date(), 14),
    });
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(ParamInvalidError);
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
    expect(result.value).toBeUndefined();
  });
});
