import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OuputGetTagByUuidDTO } from 'src/application/dtos/tags/get-by-uuid.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { GetTagByUuidService } from 'src/application/queries/tags/get-by-uuid/get-tag-by-uuid.service';

@Controller('tags/by')
@ApiBearerAuth()
@ApiTags('Get Tag By Uuid')
@UseGuards(AuthGuard)
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
