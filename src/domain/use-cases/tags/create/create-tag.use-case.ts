import { InputCrateTagsDTO, OutputCreateTagsDTO } from './create-tag.dto';

export interface ICreateTagsUseCase {
  execute(
    input: InputCrateTagsDTO,
  ): OutputCreateTagsDTO | Promise<OutputCreateTagsDTO>;
}
