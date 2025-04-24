import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RemoveAssignmentUseCase } from './remove-assignment.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { getEventDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { DiRepository } from 'src/domain/constants/di.constants';
import { IUserRepository } from 'src/domain/repositories/user.repository';

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
      userUuid: mockUser.uuid,
      eventUuid: mockEvent.uuid,
    });

    expect(result.isRight()).toBeTruthy();
  });
});
