import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './register/register-user.use-case';
import { RegisterUserController } from './register/register-user.controller';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/domain/constants/jwt-constants';
import { AuthenticateUserUseCase } from './authenticate/authenticate-user.use-case';
import { AuthenticateUserController } from './authenticate/authenticate-user.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
  controllers: [RegisterUserController, AuthenticateUserController],
})
export class AuthModule {}
