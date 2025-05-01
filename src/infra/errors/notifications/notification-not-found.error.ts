import { IError } from 'src/domain/error/error';

export class NotificationNotFoundError implements IError {
  reason: string = '[Notification Not Found]';
  message: string = 'This notification not found or not exists.';
}
