import { Module } from '@nestjs/common';
import { EventsGatewaysModule } from './events/events-gateways.module';

@Module({
  imports: [EventsGatewaysModule],
})
export class GatewaysModule {}
