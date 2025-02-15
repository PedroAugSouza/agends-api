import { InputRemoveTagDTO, OutputRemoveTagDTO } from './remove-tag.dto';

export interface IRemoveTagUseCase {
  execute(
    input: InputRemoveTagDTO,
  ): OutputRemoveTagDTO | Promise<OutputRemoveTagDTO>;
}
