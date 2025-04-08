import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputGetAllEventsDTO,
  OutputGetAllEventsDTO,
} from 'src/domain/dtos/events/get-all-events.dto';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';

@Injectable()
export class GetAllEventsService
  implements IUseCase<InputGetAllEventsDTO, OutputGetAllEventsDTO[]>
{
  constructor(
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,
  ) {}

  async execute(input: InputGetAllEventsDTO): Promise<OutputGetAllEventsDTO[]> {
    const events = await this.eventsRepository.findAll(input.userUuid);

    const result = events.filter(
      (event) =>
        event.date.getMonth() === input.currentMonth.getMonth() &&
        event.date.getFullYear() === input.currentMonth.getFullYear(),
    );

    return result.map(
      (data) =>
        ({
          allDay: data.allDay,
          date: data.date,
          name: data.name,
          tag: {
            color: data?.Tag?.color,
            name: data?.Tag?.name,
          },
          uuid: data.uuid,
          endsOf: data.endsOf,
          startsOf: data.startsOf,
        }) as OutputGetAllEventsDTO,
    );
  }
}
