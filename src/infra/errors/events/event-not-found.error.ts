import { IError } from 'src/domain/error/error';

export class EventNotFoundError implements IError {
  reason: string = '[Event Not Found]';
  message: string = 'This event not found or not exists';
}
