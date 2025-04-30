import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { IError } from 'src/domain/error/error';
import { InputAuthenticateUserDTO } from 'src/application/dtos/users/authenticate-user.dto';
import { MissingParamError } from 'src/infra/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/infra/errors/shared/unexpected.error';
import { ParamInvalidError } from 'src/infra/errors/shared/param-invalid.error';
import { UserNotfoundError } from 'src/infra/errors/users/user-not-found.error';

@Controller('login')
@ApiTags('Authenticate User Controller')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: '4XX',
    type: IError,
    description: 'Client error',
  })
  @ApiResponse({
    status: '5XX',
    type: IError,
    description: 'Internal server error',
  })
  @ApiResponse({
    description: 'User authenticated',
    status: 201,
    content: {
      'application/json': {
        schema: {
          properties: {
            access_token: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async handle(@Body() body: InputAuthenticateUserDTO) {
    const result = await this.authenticateUserUseCase.execute({ ...body });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof UserNotfoundError)
      throw new HttpException(result.value, HttpStatus.NOT_FOUND);

    if (result.value instanceof ParamInvalidError)
      throw new HttpException(result.value, HttpStatus.UNAUTHORIZED);

    return result.value;
  }
}
