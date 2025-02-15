import { IError } from 'src/infra/error/error';

export class MissingParamError implements IError {
  reason: string = '[Missing Param Error]';
  message: string;

  constructor(param: string) {
    this.message = `the param "${param}" is missing`;
  }
}
