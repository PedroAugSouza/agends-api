import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetAllTagsService } from './get-all-tags.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { OutputGetAllTagsDTO } from 'src/domain/dtos/tags/get-all-tags.dto';
import { AuthGuard } from 'src/infra/auth/auth.guard';

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
