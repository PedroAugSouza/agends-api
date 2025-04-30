import { Injectable } from '@nestjs/common';
import {
  InputGetAllTagsDTO,
  OutputGetAllTagsDTO,
} from 'src/application/dtos/tags/get-all-tags.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUseCase } from 'src/domain/use-case/shared/use-case';

@Injectable()
export class GetAllTagsService
  implements IUseCase<InputGetAllTagsDTO, OutputGetAllTagsDTO[]>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: InputGetAllTagsDTO): Promise<OutputGetAllTagsDTO[]> {
    const result = await this.prisma.tag.findMany({
      where: {
        userUuid: input.userUuid,
      },
    });

    if (!result) return [];

    return result.map((tag) => ({
      uuid: tag.uuid,
      name: tag.name,
      color: tag.color,
    }));
  }
}
