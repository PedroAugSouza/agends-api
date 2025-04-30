import { Module } from '@nestjs/common';
import { CreateEventUseCase } from './create/create-event.use-case';
import { UpdateEventUseCase } from './update/update-event.use-case';
import { RemoveEventUseCase } from './remove/remove-event.use-case';
import { RemoveAssignmentUseCase } from './remove-assignment/remove-assignment.use-case';
import { CreateEventController } from 'src/ui/controllers/events/create-event.controller';
import { RemoveAssignmentController } from 'src/ui/controllers/events/remove-assignment.controller';
import { RemoveEventsController } from 'src/ui/controllers/events/remove-event.controller';
import { UpdateEventController } from 'src/ui/controllers/events/update-event.controller';

@Module({
  providers: [
    CreateEventUseCase,
    UpdateEventUseCase,
    RemoveEventUseCase,
    RemoveAssignmentUseCase,
  ],
  controllers: [
    CreateEventController,
    UpdateEventController,
    RemoveEventsController,
    RemoveAssignmentController,
  ],
})
export class EventsCommandsModule {}
