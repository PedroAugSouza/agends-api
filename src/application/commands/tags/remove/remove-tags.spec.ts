import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { describe, it, expect, beforeAll } from 'vitest';
import { RemoveTagsUseCase } from './remove-tags.use-case';
import { ITagRepository } from 'src/domain/repositories/tags.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { getTagDummy } from '__test__dummy/mock/mock.entities';

describe('Remove Tag Use Case: ', () => {
  let removeTagUseCase: RemoveTagsUseCase;
  let tagRepository: ITagRepository;

  const mockTag = getTagDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [RemoveTagsUseCase],
    }).compile();

    removeTagUseCase = module.get<RemoveTagsUseCase>(RemoveTagsUseCase);

    tagRepository = module.get<ITagRepository>(DiRepository.TAGS);

    tagRepository.save(mockTag);
  });

  it(`should be able to remove a tag`, async () => {
    const result = await removeTagUseCase.execute({ uuid: mockTag.uuid });

    expect(result.isRight()).toBeTruthy();
  });

  it(`shouldn't be able to remove a tag if uuid is missing`, async () => {
    const result = await removeTagUseCase.execute({ uuid: '' });

    expect(result.isRight()).toBeFalsy();
  });
});
