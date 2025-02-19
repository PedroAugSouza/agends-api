import { EntityProps } from './props';
import { Either } from 'src/infra/utils/either/either';
import { ParamInvalidError } from '../errors/shared/param-invalid.error';
export declare abstract class Entity<T extends EntityProps> {
    protected uuid: string;
    protected props: T;
    result: Either<ParamInvalidError, T>;
    protected create(props: T, uuid?: string): void;
    protected toValue(): T;
}
