import { IError } from 'src/domain/error/error';

export class TagNotFoundError implements IError {
  reason: string = '[Tag Not Found Error]';
  message: string = 'Tag not found.';
}
