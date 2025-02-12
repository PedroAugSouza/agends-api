import { IError } from 'src/infra/error/error';
export declare class MissingParamError implements IError {
    reason: string;
    message: string;
    constructor(param: string);
}
