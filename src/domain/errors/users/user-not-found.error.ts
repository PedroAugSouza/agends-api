import { IError } from 'src/infra/error/error';

export class UserNotfoundError implements IError {
  reason: string = '[User Not Found]';
  message: string = 'This user not found.';
}
