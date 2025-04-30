import { Module } from '@nestjs/common';
import { AssignUsersGateway } from './assign-users/assign-users.gateway';

@Module({
  providers: [AssignUsersGateway],
})
export class EventsGatewaysModule {}
