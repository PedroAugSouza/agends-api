import { IError } from 'src/infra/error/error';

export class UnexpectedError implements IError {
  reason: string = '[Internal server error]';
  message: string;

  constructor(error: unknown) {
    this.message = String(error);
  }
}
