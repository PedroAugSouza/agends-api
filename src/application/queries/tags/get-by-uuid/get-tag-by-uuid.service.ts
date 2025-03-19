import { Injectable } from '@nestjs/common';
import {
  InputGetTagByUuidDTO,
  OuputGetTagByUuidDTO,
} from 'src/domain/dtos/tags/get-by-uuid.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUseCase } from 'src/infra/use-case/shared/use-case';

@Injectable()
export class GetTagByUuidService
  implements IUseCase<InputGetTagByUuidDTO, OuputGetTagByUuidDTO>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: InputGetTagByUuidDTO): Promise<OuputGetTagByUuidDTO> {
    const result = await this.prisma.tag.findUnique({
      where: {
        uuid: input.uuid,
      },
    });

    if (!result) return null;

    return {
      uuid: result.uuid,
      name: result.name,
      color: result.color,
    };
  }
}
