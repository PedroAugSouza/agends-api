import { EventProps } from '../entities/event/event.contact';

export interface IEventRepository {
  save(event: EventProps): void;
  remove(uuid: string): void;
  update(event: EventProps): void;
  assign(userUuid: string, eventUuid: string): void;
  removeAssign(userUuid: string, eventUuid: string): void;
  findByUuid(uuid: string): EventProps | null | Promise<EventProps | null>;
}
