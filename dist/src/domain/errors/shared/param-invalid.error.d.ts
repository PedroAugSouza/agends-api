import { IError } from 'src/infra/error/error';
export declare class ParamInvalidError implements IError {
    reason: string;
    message: string;
    constructor(customMessage?: string);
}
