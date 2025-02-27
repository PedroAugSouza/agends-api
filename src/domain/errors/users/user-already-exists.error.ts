import { IError } from 'src/infra/error/error';

export class UserAlreadyExistError implements IError {
  reason: string = '[User Already Exists]';
  message: string = 'A user already uses this email';
}
