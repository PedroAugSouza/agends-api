import { IError } from 'src/domain/error/error';

export class UnauthorizedError implements IError {
  reason: string = '[User Unauthorized]';
  message: string = 'This user is not authorized, password is incorrect.';
}
