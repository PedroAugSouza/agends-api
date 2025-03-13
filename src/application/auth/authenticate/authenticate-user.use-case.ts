import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DiRepository } from 'src/domain/constants/di.constants';
import {
  InputAuthenticateUserDTO,
  OutputAuthenticateUserDTO,
} from 'src/domain/dtos/users/authenticate-user.dto';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { ParamInvalidError } from 'src/domain/errors/shared/param-invalid.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { UserNotfoundError } from 'src/domain/errors/users/user-not-found.error';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IUseCase } from 'src/infra/use-case/shared/use-case';
import { left, right } from 'src/infra/utils/either/either';

@Injectable()
export class AuthenticateUserUseCase
  implements IUseCase<InputAuthenticateUserDTO, OutputAuthenticateUserDTO>
{
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DiRepository.USERS)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    input: InputAuthenticateUserDTO,
  ): Promise<OutputAuthenticateUserDTO> {
    try {
      if (!input.email) return left(new MissingParamError('email'));

      const alreadyExistsUser = await this.userRepository.findByEmail(
        input.email,
      );

      if (!alreadyExistsUser) return left(new UserNotfoundError());

      if (!input.password) return left(new MissingParamError('password'));

      if (input.password !== alreadyExistsUser.password)
        return left(new ParamInvalidError('Password does not match'));

      const payload = {
        uuid: alreadyExistsUser.uuid,
        name: alreadyExistsUser.name,
        email: alreadyExistsUser.email,
        dateBirth: alreadyExistsUser.dateBirth,
      };

      return right({
        access_token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
