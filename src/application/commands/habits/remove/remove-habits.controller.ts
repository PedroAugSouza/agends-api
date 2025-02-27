import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IError } from 'src/infra/error/error';
import { RemoveHabitsUseCase } from './remove-habits.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected.error';
import { AuthGuard } from 'src/infra/auth/auth.guard';

@Controller('habit')
@ApiTags('Remove Habit Controller')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RemoveHabitsController {
  constructor(private readonly removeHabitsUseCase: RemoveHabitsUseCase) {}

  @Delete('/:uuid')
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
    status: 200,
    description: 'Habit Removed',
  })
  async handle(@Param('uuid') uuid: string) {
    const result = await this.removeHabitsUseCase.execute({ uuid });

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    return result.value;
  }
}
