import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/domain/error/error';
import { OutputGetAllTagsDTO } from 'src/application/dtos/tags/get-all-tags.dto';
import { AuthGuard } from 'src/ui/auth/auth.guard';
import { GetAllTagsService } from 'src/application/queries/tags/get-all/get-all-tags.service';

@Controller('tags')
@ApiTags('Get All Tags Controller')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GetAllTagsController {
  constructor(private readonly getAllTagsService: GetAllTagsService) {}

  @Get('/:userUuid')
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
    description: 'Tag list',
    type: [OutputGetAllTagsDTO],
  })
  async handle(@Param('userUuid') uuid: string) {
    const result = await this.getAllTagsService.execute({
      userUuid: uuid,
    });

    return result;
  }
}
