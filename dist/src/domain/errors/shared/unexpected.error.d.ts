import { IError } from 'src/infra/error/error';
export declare class UnexpectedError implements IError {
    reason: string;
    message: string;
    constructor(error: unknown);
}
