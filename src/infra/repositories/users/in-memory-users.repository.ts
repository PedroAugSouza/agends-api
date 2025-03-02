import { Injectable } from '@nestjs/common';
import { UserProps } from 'src/domain/entities/user/user.contact';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class InMemoryUsersRepository implements IUserRepository {
  private readonly users: Map<string, UserProps> = new Map();

  save(user: UserProps): void {
    this.users.set(user.uuid, user);
  }
  update(user: UserProps): void {
    this.users.set(user.uuid, user);
  }
  findByEmail(email: string): UserProps | null {
    const user = Array.from(this.users.values()).filter(
      (user) => user.email === email,
    )[0];

    if (user) return user;
    return null;
  }
  findByUuid(uuid: string): UserProps | null {
    const user = Array.from(this.users.values()).filter(
      (user) => user.uuid === uuid,
    )[0];

    if (user) return user;
    return null;
  }
  remove(uuid: string): void {
    this.users.delete(uuid);
  }
}
