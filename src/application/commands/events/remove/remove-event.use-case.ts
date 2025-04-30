import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputRemoveEventDTO,
  OutputRemoveEventDTO,
} from 'src/application/dtos/events/remove-event.dto';
import { EventNotFoundError } from 'src/infra/errors/events/event-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class RemoveEventUseCase
  implements IUseCase<InputRemoveEventDTO, OutputRemoveEventDTO>
{
  constructor(
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,
  ) {}

  async execute(input: InputRemoveEventDTO): Promise<OutputRemoveEventDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      const habit = await this.eventsRepository.findByUuid(input.uuid);

      if (!habit) return left(new EventNotFoundError());

      await this.eventsRepository.remove(input.uuid);

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
