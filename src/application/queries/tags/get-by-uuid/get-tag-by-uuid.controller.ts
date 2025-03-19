import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OuputGetTagByUuidDTO } from 'src/domain/dtos/tags/get-by-uuid.dto';
import { GetTagByUuidService } from './get-tag-by-uuid.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { AuthGuard } from 'src/infra/auth/auth.guard';

@Controller('tag')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Get Tag By Uuid')
export class GetTagByUuidController {
  constructor(private readonly getTagByUuidService: GetTagByUuidService) {}

  @Get('/:uuid')
  @ApiResponse({
    status: '4XX',
    type: IError,
    description: 'Client error',
  })
  @ApiResponse({
    status: '5XX',
    type: IError,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 200,
    description: 'Tag finded',
    type: OuputGetTagByUuidDTO,
  })
  async handle(@Param('uuid') uuid: string): Promise<OuputGetTagByUuidDTO> {
    const result = await this.getTagByUuidService.execute({ uuid });

    return result;
  }
}
