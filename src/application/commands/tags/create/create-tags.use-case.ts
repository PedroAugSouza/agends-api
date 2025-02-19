import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputCreateTagDTO,
  OutputCreateTagDTO,
} from 'src/domain/dtos/tags/create-tag.dto';
import { Tag } from 'src/domain/entities/tag/tag.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { ITagRepository } from 'src/domain/repositories/tags.repository';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class CreateTagsUseCase
  implements IUseCase<InputCreateTagDTO, OutputCreateTagDTO>
{
  constructor(
    @Inject(DiRepository.TAGS)
    private readonly tagRepository: ITagRepository,

    @Inject(DiRepository.USERS)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: InputCreateTagDTO): Promise<OutputCreateTagDTO> {
    try {
      if (!input.userUuid) return left(new MissingParamError('User uuid'));

      const alreadyExistUser = await this.userRepository.findByUuid(
        input.userUuid,
      );

      if (!alreadyExistUser) return left(new UserNotfoundError());

      if (!input.name) return left(new MissingParamError('Name'));

      if (!input.color) return left(new MissingParamError('Color'));

      const tag = new Tag({ ...input });

      if (tag.result.value instanceof ParamInvalidError) {
        return left(tag.result.value);
      }

      await this.tagRepository.save(tag.result.value);
      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
