import { Injectable } from '@nestjs/common';
import { TagProps } from 'src/domain/entities/tag/tag.contact';
import { ITagRepository } from 'src/domain/repositories/tags.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaTagsRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tag: TagProps): Promise<void> {
    await this.prisma.tag.create({
      data: {
        color: tag.color,
        name: tag.name,
        userUuid: tag.userUuid,
      },
    });
  }

  async remove(uuid: string): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        uuid,
      },
    });
  }
}
