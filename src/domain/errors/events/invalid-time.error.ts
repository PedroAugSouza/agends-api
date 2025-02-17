import { IError } from 'src/infra/error/error';

export class InvalidTimeError implements IError {
  reason: string = '[Invalid Time Erorr]';
  message: string = 'This time is invalid';
}
