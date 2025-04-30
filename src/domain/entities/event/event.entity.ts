import { Left, Right } from 'src/infra/utils/either/either';
import { Entity } from '../entity';
import { EventProps } from './event.contact';

import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';

export class Event extends Entity<EventProps> {
  constructor(props: EventProps, uuid?: string) {
    super();

    if (props.allDay && props.endsOf && props.startsOf) {
      this.result = new Left(new ParamInvalidError('This event is all day'));
      return;
    }

    if (
      props.allDay === false &&
      props.endsOf === null &&
      props.startsOf === null
    ) {
      this.result = new Left(new ParamInvalidError(`Event time not indicated`));
      return;
    }

    if (props.startsOf > props.endsOf) {
      this.result = new Left(
        new ParamInvalidError(`Event with end time before start time`),
      );
    }

    this.create(props, uuid);
    this.result = new Right(this.toValue());
  }
}
