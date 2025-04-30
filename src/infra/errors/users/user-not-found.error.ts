import { IError } from 'src/domain/error/error';

export class UserNotfoundError implements IError {
  reason: string = '[User Not Found]';
  message: string = 'This user not found.';
}
