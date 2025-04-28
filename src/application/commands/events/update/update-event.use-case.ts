import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputUpdateEventDTO,
  OutputUpdateEventDTO,
} from 'src/domain/dtos/events/update-event.dto';
import { Event } from 'src/domain/entities/event/event.entity';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class UpdateEventUseCase
  implements IUseCase<InputUpdateEventDTO, OutputUpdateEventDTO>
{
  constructor(
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,
  ) {}

  async execute(input: InputUpdateEventDTO): Promise<OutputUpdateEventDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      const event = await this.eventsRepository.findByUuid(input.uuid);

      if (!event) return left(new EventNotFoundError());

      const newEvent = new Event(
        {
          allDay: input.allDay ?? event.allDay,
          createdAt: event.createdAt,
          date: input.date ?? event.date,
          endsOf: input.endsOf ?? event.endsOf,
          startsOf: input.startsOf ?? event.startsOf,
          name: input.name ?? event.name,
          tagUuid: input.tagUuid ?? event.tagUuid,
          updatedAt: new Date(),
        },
        input.uuid,
      );

      if (newEvent.result.value instanceof ParamInvalidError)
        return left(newEvent.result.value);

      await this.eventsRepository.update(newEvent.result.value);

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
