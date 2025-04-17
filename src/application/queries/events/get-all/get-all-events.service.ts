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
          uuid: data.uuid,
          name: data.name,
          date: data.date,
          tag: {
            uuid: data?.Tag?.uuid,
            color: data?.Tag?.color,
            name: data?.Tag?.name,
          },
          allDay: data.allDay,
          endsOf: data.endsOf,
          startsOf: data.startsOf,
          assignedEventToUsers: data.AssignedEventToUsers?.map((assignee) => ({
            uuid: assignee.uuid,
            user: {
              uuid: assignee.user.uuid,
              name: assignee.user.name,
              email: assignee.user.email,
            },
          })),
        }) as OutputGetAllEventsDTO,
    );
  }
}
