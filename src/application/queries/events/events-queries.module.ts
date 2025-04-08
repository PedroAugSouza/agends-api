import { Module } from '@nestjs/common';
import { GetAllEventsController } from './get-all/get-all-events.controller';
import { GetAllEventsService } from './get-all/get-all-events.service';

@Module({
  controllers: [GetAllEventsController],
  providers: [GetAllEventsService],
})
export class EventsQueriesModule {}
