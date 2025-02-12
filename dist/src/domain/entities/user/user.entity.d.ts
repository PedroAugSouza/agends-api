import { Entity } from '../entity';
import { UserProps } from './user.contact';
export declare class User extends Entity<UserProps> {
    constructor(props: UserProps, uuid?: string);
}
