import { IError } from 'src/domain/error/error';

export class MissingParamError implements IError {
  reason: string = '[Missing Param Error]';
  message: string;

  constructor(param: string) {
    this.message = `the param "${param}" is missing`;
  }
}
