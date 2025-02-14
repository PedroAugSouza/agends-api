import { UserProps } from '../entities/user/user.contact';

export interface IUserRepository {
  save(user: UserProps): void;
  update(user: UserProps): void;
  findByEmail(email: string): UserProps | null | Promise<UserProps | null>;
  findByUuid(uuid: string): UserProps | null | Promise<UserProps | null>;
  remove(uuid: string): void;
}
