import { Module } from '@nestjs/common';
import { AssignUsersGateway } from './assign-users/assign-users.gateway';
import { RemoveAssignmentGateway } from './remove-assignment/remove-assignment.gateway';

@Module({
  providers: [AssignUsersGateway, RemoveAssignmentGateway],
})
export class EventsGatewaysModule {}
