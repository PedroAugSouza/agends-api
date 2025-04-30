import { describe, beforeAll, it, expect } from 'vitest';
import { UpdateEventUseCase } from './update-event.use-case';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { getEventDummy } from '__test__dummy/mock/mock.entities';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { DiRepository } from 'src/domain/constants/di.constants';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';

describe('Update Event Use Case: ', () => {
  let updateEventUseCase: UpdateEventUseCase;

  let eventsRepository: IEventRepository;

  const mockEvent = getEventDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEventUseCase],
      imports: [InMemoryRepositoriesModule],
    }).compile();

    updateEventUseCase = module.get<UpdateEventUseCase>(UpdateEventUseCase);

    eventsRepository = module.get<IEventRepository>(DiRepository.EVENTS);

    eventsRepository.save(mockEvent);
  });

  it(`should be able to update a event`, async () => {
    const result = await updateEventUseCase.execute({
      uuid: mockEvent.uuid,
      name: 'new name',
    });

    expect(result.isRight()).toBeTruthy();
    const updatedEvent = await eventsRepository.findByUuid(mockEvent.uuid);
    expect(updatedEvent?.name).toBe('new name');
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to update a event if the uuid is missing`, async () => {
    const result = await updateEventUseCase.execute({
      uuid: '',
      name: 'new name',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to update a event if the event not exists`, async () => {
    const result = await updateEventUseCase.execute({
      uuid: 'inexistent event',
      name: 'new name',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EventNotFoundError);
  });
});
