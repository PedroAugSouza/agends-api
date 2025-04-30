import { IError } from 'src/domain/error/error';

export class UnexpectedError implements IError {
  reason: string = '[Internal server error]';
  message: string;

  constructor(error: unknown) {
    this.message = String(error);
  }
}
