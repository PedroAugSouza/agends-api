import { Module } from '@nestjs/common';
import { CreateEventUseCase } from './create/create-event.use-case';
import { CreateEventController } from './create/create-event.controller';
import { UpdateEventUseCase } from './update/update-event.use-case';
import { RemoveEventUseCase } from './remove/remove-event.use-case';
import { UpdateEventController } from './update/update-event.controller';
import { RemoveEventsController } from './remove/remove-event.controller';

@Module({
  providers: [CreateEventUseCase, UpdateEventUseCase, RemoveEventUseCase],
  controllers: [
    CreateEventController,
    UpdateEventController,
    RemoveEventsController,
  ],
})
export class EventsCommandsModule {}
