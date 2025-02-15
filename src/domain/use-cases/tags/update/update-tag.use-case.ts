import { InputUpdateTagDTO, OutputUpdateTagDTO } from './update-tag.dto';

export interface IUpdateTagUseCase {
  execute(
    input: InputUpdateTagDTO,
  ): OutputUpdateTagDTO | Promise<OutputUpdateTagDTO>;
}
