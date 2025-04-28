import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputRemoveAssignmentDTO,
  OutputRemoveAssignmentDTO,
} from 'src/domain/dtos/events/remove-assignment.dto';
import { EventNotFoundError } from 'src/domain/errors/events/event-not-found.error';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class RemoveAssignmentUseCase
  implements IUseCase<InputRemoveAssignmentDTO, OutputRemoveAssignmentDTO>
{
  constructor(
    @Inject(DiRepository.EVENTS)
    private readonly eventsRepository: IEventRepository,
    @Inject(DiRepository.USERS)
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(
    input: InputRemoveAssignmentDTO,
  ): Promise<OutputRemoveAssignmentDTO> {
    try {
      if (!input.userEmail) return left(new MissingParamError('userEmail'));

      const alreadyExistsUser = await this.usersRepository.findByEmail(
        input.userEmail,
      );

      if (!alreadyExistsUser) return left(new UserNotfoundError());

      if (!input.eventUuid) return left(new MissingParamError('eventUuid'));

      const alreadyExistsEvent = await this.eventsRepository.findByUuid(
        input.eventUuid,
      );

      if (!alreadyExistsEvent) return left(new EventNotFoundError());

      await this.eventsRepository.removeAssignment(
        input.userEmail,
        input.eventUuid,
      );

      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
