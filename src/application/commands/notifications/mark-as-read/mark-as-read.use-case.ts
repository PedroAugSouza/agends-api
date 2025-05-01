import { Inject, Injectable } from '@nestjs/common';
import {
  InputMarkAsReadDTO,
  OutputMarkAsReadDTO,
} from 'src/application/dtos/notifications/mark-as-read-notification.dto';
import { DiRepository } from 'src/domain/constants/di.constants';
import { INotificationsRepository } from 'src/domain/repositories/notification.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { NotificationNotFoundError } from 'src/infra/errors/notifications/notification-not-found.error';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class MarkAsReadNotificationUsecase
  implements IUseCase<InputMarkAsReadDTO, OutputMarkAsReadDTO>
{
  constructor(
    @Inject(DiRepository.NOTIFICATIONS)
    private readonly notificationsRepository: INotificationsRepository,
  ) {}

  async execute(input: InputMarkAsReadDTO): Promise<OutputMarkAsReadDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      const alreadyExistsNotification =
        await this.notificationsRepository.findByUuid(input.uuid);

      if (!alreadyExistsNotification)
        return left(new NotificationNotFoundError());

      await this.notificationsRepository.markAsRead(input.uuid);
      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
