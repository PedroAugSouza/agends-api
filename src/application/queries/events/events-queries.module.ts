import { Module } from '@nestjs/common';
import { GetAllEventsService } from './get-all/get-all-events.service';
import { GetAllEventsController } from 'src/ui/controllers/events/get-all-events.controller';

@Module({
  controllers: [GetAllEventsController],
  providers: [GetAllEventsService],
})
export class EventsQueriesModule {}
