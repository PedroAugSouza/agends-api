import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeAll, it, expect } from 'vitest';
import { RemoveEventUseCase } from './remove-event.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { getEventDummy } from '__test__dummy/mock/mock.entities';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';

describe('Remove Event Use Case: ', () => {
  let removeEventUseCase: RemoveEventUseCase;

  let eventsRepository: IEventRepository;

  const mockEvent = getEventDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveEventUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    removeEventUseCase = module.get<RemoveEventUseCase>(RemoveEventUseCase);

    eventsRepository = module.get<IEventRepository>(DiRepository.EVENTS);

    eventsRepository.save(mockEvent);
  });

  it(`should be able to remove a event`, async () => {
    const result = await removeEventUseCase.execute({ uuid: mockEvent.uuid });

    expect(result.isRight()).toBeTruthy();
    const hasEvent = await eventsRepository.findByUuid(mockEvent.uuid);
    expect(hasEvent).toBeNull();
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to remove a event if the param uuid is missing`, async () => {
    const result = await removeEventUseCase.execute({ uuid: '' });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to remove a event if the event not exist`, async () => {
    const result = await removeEventUseCase.execute({
      uuid: 'inexistent event',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EventNotFoundError);
  });
});
