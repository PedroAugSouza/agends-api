import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputCreateEventDTO,
  OutputCreateEventDTO,
} from 'src/domain/dtos/events/create-event.dto';
import { Event } from 'src/domain/entities/event/event.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
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

      if (!input.userUuid) return left(new MissingParamError('User Uuid'));

      const alreadyExistsUser = await this.usersRepository.findByUuid(
        input.userUuid,
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
        input.userUuid,
        event.result.value.uuid,
      );

      if (input.assignedUsers?.length) {
        await this.eventsRepository.assignMany(
          input.assignedUsers.map((assignedUser) => {
            if (event.result.value instanceof ParamInvalidError) return;

            return {
              eventUuid: event.result.value.uuid,
              userUuid: assignedUser,
            };
          }),
        );
      }

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
