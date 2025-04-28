import { EventProps } from '../entities/event/event.contact';

export interface IEventRepository {
  save(event: EventProps): void | Promise<void>;
  remove(uuid: string): void | Promise<void>;
  update(event: EventProps): void | Promise<void>;
  assign(
    userUuid: string,
    eventUuid: string,
    isOwner?: boolean,
  ): void | Promise<void>;
  assignMany(
    input: {
      userEmail: string;
      eventUuid: string;
    }[],
  ): void | Promise<void>;
  removeAssignment(userEmail: string, eventUuid: string): void | Promise<void>;
  findByUuid(uuid: string): EventProps | null | Promise<EventProps | null>;
  findAll(userUuid: string): EventProps[] | null | Promise<EventProps[] | null>;
}
