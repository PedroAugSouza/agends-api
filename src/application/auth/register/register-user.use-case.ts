import { Inject, Injectable } from '@nestjs/common';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputRegisterUserDTO,
  OutputRegisterUserDTO,
} from 'src/application/dtos/users/register-user.dto';
import { User } from 'src/domain/entities/user/user.entity';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { UserAlreadyExistError } from 'src/infra/errors/users/user-already-exists.error';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserStatusValueObject } from 'src/domain/value-objects/user-status.value-object';
import { IUseCase } from 'src/domain/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class RegisterUserUseCase
  implements IUseCase<InputRegisterUserDTO, OutputRegisterUserDTO>
{
  constructor(
    @Inject(DiRepository.USERS)
    private readonly usersRepository: IUserRepository,
  ) {}

  async execute(input: InputRegisterUserDTO): Promise<OutputRegisterUserDTO> {
    try {
      if (!input.email) return left(new MissingParamError('Email'));

      const alredyExistUser = await this.usersRepository.findByEmail(
        input.email,
      );

      if (alredyExistUser) return left(new UserAlreadyExistError());

      if (!input.name) return left(new MissingParamError('Name'));

      if (!input.password) return left(new MissingParamError('Password'));

      if (!input.dateBirth) return left(new MissingParamError('Date Birth'));

      const user = new User({
        ...input,
        dateBirth: new Date(input.dateBirth),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: UserStatusValueObject.ENABLE,
      });

      if (user.result.value instanceof ParamInvalidError)
        return left(user.result.value);

      await this.usersRepository.save(user.result.value);
      return right(undefined);
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
