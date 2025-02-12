import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';
import { EntityProps } from '../props';
export declare class UserProps extends EntityProps {
    name: string;
    email: string;
    password: string;
    dateBirth: Date;
    status: UserStatusValueObject;
    createdAt: Date;
    updatedAt: Date;
}
