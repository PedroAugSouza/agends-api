import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputRemoveTagDTO,
  OutputRemoveTagDTO,
} from 'src/domain/dtos/tags/remove-tag.dto';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { ITagRepository } from 'src/domain/repositories/tags.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class RemoveTagsUseCase
  implements IUseCase<InputRemoveTagDTO, OutputRemoveTagDTO>
{
  constructor(
    @Inject(DiRepository.TAGS)
    private readonly tagsRepository: ITagRepository,
  ) {}
  async execute(input: InputRemoveTagDTO): Promise<OutputRemoveTagDTO> {
    try {
      if (!input.uuid) return left(new MissingParamError('uuid'));

      await this.tagsRepository.remove(input.uuid);
      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
