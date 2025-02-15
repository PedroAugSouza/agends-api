import { getEventDummy } from '__test__dummy/mock/mock.entities';
import { describe, expect, it } from 'vitest';
import { Event } from './event.entity';

describe('Create event entity: ', () => {
  const mockEvent = getEventDummy();

  it(`should be able to create a event`, () => {
    const event = new Event(mockEvent, mockEvent.uuid);

    expect(event.result.isRight()).toBeTruthy();
  });

  it(`shouldn't be possible to create an event if it's not a full day event or doesn't have a time slot`, () => {
    const event = new Event(
      {
        ...mockEvent,
        allDay: true,
        endsOf: new Date(),
        startsOf: new Date(),
      },
      mockEvent.uuid,
    );

    expect(event.result.isRight()).toBeFalsy();
  });
  it(`shouldn't be possible to create an event if it's not a full day event or doesn't have a time slot`, () => {
    const event = new Event(
      {
        ...mockEvent,
        allDay: false,
        endsOf: null,
        startsOf: null,
      },
      mockEvent.uuid,
    );

    expect(event.result.isRight()).toBeFalsy();
  });
});
