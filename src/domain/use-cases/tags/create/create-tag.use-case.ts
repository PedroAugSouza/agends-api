import { InputCrateTagDTO, OutputCreateTagDTO } from './create-tag.dto';

export interface ICreateTagsUseCase {
  execute(
    input: InputCrateTagDTO,
  ): OutputCreateTagDTO | Promise<OutputCreateTagDTO>;
}
