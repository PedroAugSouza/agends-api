import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RemoveAssignmentUseCase } from './remove-assignment.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { getEventDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { DiRepository } from 'src/domain/constants/di.constants';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';

describe('Remove assignments use case: ', () => {
  let removeAssignmentUseCase: RemoveAssignmentUseCase;
  let eventsRepository: IEventRepository;
  let usersRepository: IUserRepository;

  const mockEvent = getEventDummy();
  const mockUser = getUserDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveAssignmentUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    removeAssignmentUseCase = module.get<RemoveAssignmentUseCase>(
      RemoveAssignmentUseCase,
    );
    eventsRepository = module.get<IEventRepository>(DiRepository.EVENTS);
    usersRepository = module.get<IUserRepository>(DiRepository.USERS);

    usersRepository.save(mockUser);

    eventsRepository.save(mockEvent);

    eventsRepository.assign(mockUser.uuid, mockEvent.uuid);
  });

  it(`should be able to remove an assignment`, async () => {
    const result = await removeAssignmentUseCase.execute({
      userEmail: mockUser.email,
      eventUuid: mockEvent.uuid,
    });

    console.log(result.value);

    expect(result.isRight()).toBeTruthy();
  });
  it(`shouldn't be able to remove an assignment if the user email is missing`, async () => {
    const result = await removeAssignmentUseCase.execute({
      userEmail: '',
      eventUuid: mockEvent.uuid,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to remove an assignment if the event uuid is missing`, async () => {
    const result = await removeAssignmentUseCase.execute({
      userEmail: mockUser.email,
      eventUuid: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to remove an assignment if the user not exist`, async () => {
    const result = await removeAssignmentUseCase.execute({
      userEmail: 'inextistent user',
      eventUuid: mockEvent.uuid,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserNotfoundError);
  });
  it(`shouldn't be able to remove an assignment if the event not exist`, async () => {
    const result = await removeAssignmentUseCase.execute({
      userEmail: mockUser.email,
      eventUuid: 'inextistent event',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EventNotFoundError);
  });
});
