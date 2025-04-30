import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputGetTagByUuidDTO,
  OuputGetTagByUuidDTO,
} from 'src/application/dtos/tags/get-by-uuid.dto';
import { ITagRepository } from 'src/domain/repositories/tags.repository';
import { IUseCase } from 'src/domain/use-case/shared/use-case';

@Injectable()
export class GetTagByUuidService
  implements IUseCase<InputGetTagByUuidDTO, OuputGetTagByUuidDTO>
{
  constructor(
    @Inject(DiRepository.TAGS)
    private readonly tagsRepository: ITagRepository,
  ) {}

  async execute(input: InputGetTagByUuidDTO): Promise<OuputGetTagByUuidDTO> {
    const result = await this.tagsRepository.findByUuid(input.uuid);

    if (!result) return null;

    return {
      uuid: result.uuid,
      name: result.name,
      color: result.color,
    };
  }
}
