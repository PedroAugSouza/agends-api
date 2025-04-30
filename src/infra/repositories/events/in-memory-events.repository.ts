import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DiRepository } from 'src/domain/constants/di.constants';
import { EventProps } from 'src/domain/entities/event/event.contact';
import { UserProps } from 'src/domain/entities/user/user.contact';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { AssignedEventsToUsers } from 'src/domain/value-objects/assigned-events-to-users.value-object';

@Injectable()
export class InMemoryEventsRepository implements IEventRepository {
  constructor(
    @Inject(DiRepository.USERS)
    private readonly users: IUserRepository,
  ) {}

  private readonly events: Map<string, EventProps> = new Map();
  private readonly assignedEventsToUsers: Map<
    string,
    Omit<AssignedEventsToUsers, 'event' | 'user'>
  > = new Map();

  save(event: EventProps): void {
    this.events.set(event.uuid, event);
  }
  remove(uuid: string): void {
    this.events.delete(uuid);
  }
  update(event: EventProps): void {
    this.events.set(event.uuid, event);
  }
  assign(userUuid: string, eventUuid: string, isOwner: boolean): void {
    const uuid = randomUUID();
    this.assignedEventsToUsers.set(uuid, {
      eventUuid,
      userUuid,
      isOwner,
      uuid,
    });
  }

  assignMany(input: { userEmail: string; eventUuid: string }[]): void {
    input.map(({ eventUuid, userEmail }) => {
      const uuid = randomUUID();

      const user = this.users.findByEmail(userEmail).then();

      return this.assignedEventsToUsers.set(uuid, {
        eventUuid,
        userUuid: user.uuid,
        isOwner: false,
        uuid,
      });
    });
  }
  removeAssignment(userEmail: string, eventUuid: string): void {
    const user = this.users.findByEmail(userEmail) as UserProps;

    const assign = Array.from(this.assignedEventsToUsers.values()).filter(
      (assign) =>
        assign.eventUuid === eventUuid && assign.userUuid === user.uuid,
    )[0];

    this.assignedEventsToUsers.delete(assign.uuid);
  }
  findByUuid(uuid: string): EventProps | null {
    const events = Array.from(this.events.values()).filter(
      (event) => event.uuid === uuid,
    )[0];
    return events ?? null;
  }

  findAll(userUuid: string): EventProps[] | null {
    const eventsAssigned = Array.from(
      this.assignedEventsToUsers.values(),
    ).filter((assignee) => assignee.userUuid === userUuid);

    const events = Array.from(this.events.values());

    const result = eventsAssigned.map((assignee) => {
      return events.filter((event) => event.uuid === assignee.eventUuid)[0];
    });

    return result ?? null;
  }
}
