import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class EntityProps {
  @ApiProperty()
  uuid?: string;
  [index: string]: any;
}
