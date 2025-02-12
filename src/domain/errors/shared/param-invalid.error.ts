import { IError } from 'src/infra/error/error';

export class ParamInvalidError implements IError {
  reason: string = '[Param Invalid Error]';
  message: string = 'This param is invalid';

  constructor(customMessage?: string) {
    if (!customMessage) {
      return;
    }
    this.message = customMessage;
  }
}
