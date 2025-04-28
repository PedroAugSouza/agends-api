import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { describe, it, expect, beforeAll } from 'vitest';
import { CreateTagsUseCase } from './create-tags.use-case';
import { getTagDummy, getUserDummy } from '__test__dummy/mock/mock.entities';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { DiRepository } from 'src/domain/constants/di.constants';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';

describe('Create Tag Use Case: ', () => {
  let createTagsUseCase: CreateTagsUseCase;
  let userRepository: IUserRepository;

  const mockTag = getTagDummy();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [CreateTagsUseCase],
    }).compile();

    createTagsUseCase = module.get<CreateTagsUseCase>(CreateTagsUseCase);

    userRepository = module.get<IUserRepository>(DiRepository.USERS);

    userRepository.save({
      ...getUserDummy(),
    });
  });

  it(`should be able to create a new tag`, async () => {
    const result = await createTagsUseCase.execute({
      color: mockTag.color,
      name: mockTag.name,
      userUuid: mockTag.userUuid,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it(`shouldn't be able to create a new tag if the param name is missing`, async () => {
    const result = await createTagsUseCase.execute({
      color: mockTag.color,
      name: '',
      userUuid: mockTag.userUuid,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to create a new tag if the param color is missing`, async () => {
    const result = await createTagsUseCase.execute({
      color: '',
      name: mockTag.name,
      userUuid: mockTag.userUuid,
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to create a new tag if the param userUuid is missing`, async () => {
    const result = await createTagsUseCase.execute({
      color: mockTag.color,
      name: mockTag.name,
      userUuid: '',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able to create a new tag if user not exist`, async () => {
    const result = await createTagsUseCase.execute({
      color: mockTag.color,
      name: mockTag.name,
      userUuid: 'uuid',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(UserNotfoundError);
  });
});
