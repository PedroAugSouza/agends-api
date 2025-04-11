import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EventProps } from 'src/domain/entities/event/event.contact';
import { UserProps } from 'src/domain/entities/user/user.contact';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { AssignedEventsToUsers } from 'src/domain/value-objects/assigned-events-to-users.value-object';

@Injectable()
export class InMemoryEventsRepository implements IEventRepository {
  private readonly events: Map<string, EventProps> = new Map();
  private readonly users: Map<string, UserProps> = new Map();
  private readonly assignedEventsToUsers: Map<string, AssignedEventsToUsers> =
    new Map();

  save(event: EventProps): void {
    this.events.set(event.uuid, event);
  }
  remove(uuid: string): void {
    this.events.delete(uuid);
  }
  update(event: EventProps): void {
    this.events.set(event.uuid, event);
  }
  assign(userUuid: string, eventUuid: string): void {
    const uuid = randomUUID();
    this.assignedEventsToUsers.set(uuid, {
      eventUuid,
      userUuid,
      uuid,
    });
  }

  assignMany(input: { userEmail: string; eventUuid: string }[]): void {
    input.map(({ eventUuid, userEmail }) => {
      const uuid = randomUUID();

      const user = Array.from(this.users.values()).filter(
        (user) => user.email === userEmail,
      )[0];

      return this.assignedEventsToUsers.set(uuid, {
        eventUuid,
        userUuid: user.uuid,
        uuid,
      });
    });
  }
  removeAssign(userUuid: string, eventUuid: string): void {
    const assign = Array.from(this.assignedEventsToUsers.values()).filter(
      (assign) =>
        assign.eventUuid === eventUuid && assign.userUuid === userUuid,
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
      return events.filter((event) => event.uuid === assignee.userUuid)[0];
    });

    return result ?? null;
  }
}
