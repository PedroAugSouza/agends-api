import { getTagDummy } from '__test__dummy/mock/mock.entities';
import { describe, it, expect } from 'vitest';
import { Tag } from './tag.entity';

describe('Crate Tag Entity: ', () => {
  const mockTag = getTagDummy();

  it('should be able to create a tag.', () => {
    const tag = new Tag(mockTag, mockTag.uuid);

    expect(tag.result.isRight()).toBeTruthy();
  });
});
