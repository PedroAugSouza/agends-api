import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputCreateEventDTO,
  OutputCreateEventDTO,
} from 'src/application/dtos/events/create-event.dto';
import { Event } from 'src/domain/entities/event/event.entity';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class CreateEventUseCase
  implements IUseCase<InputCreateEventDTO, OutputCreateEventDTO>
{
  constructor(
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,

    @Inject(DiRepository.USERS)
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(input: InputCreateEventDTO): Promise<OutputCreateEventDTO> {
    try {
      if (!input.name) return left(new MissingParamError('Name'));

      if (input.allDay === null) return left(new MissingParamError('All Day'));

      if (!input.date) return left(new MissingParamError('Date'));

      if (!input.tagUuid) return left(new MissingParamError('Tag Uuid'));

      if (!input.userEmail) return left(new MissingParamError('User Uuid'));

      const alreadyExistsUser = await this.usersRepository.findByEmail(
        input.userEmail,
      );

      if (!alreadyExistsUser) return left(new UserNotfoundError());

      const event = new Event({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (event.result.value instanceof ParamInvalidError)
        return left(event.result.value);

      await this.eventsRepository.save(event.result.value);

      await this.eventsRepository.assign(
        input.userEmail,
        event.result.value.uuid,
        true,
      );

      return right({
        uuid: event.result.value.uuid,
      });
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
