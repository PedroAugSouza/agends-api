import { Injectable } from '@nestjs/common';
import { UserProps } from 'src/domain/entities/user/user.contact';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: UserProps): Promise<void> {
    await this.prisma.user.create({
      data: {
        createdAt: new Date(),
        dateBirth: user.dateBirth,
        email: user.email,
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
        uuid: user.uuid,
        status: 'ENABLE',
      },
    });
  }
  async update(user: UserProps): Promise<void> {
    await this.prisma.user.update({
      data: { ...user },
      where: {
        uuid: user.uuid,
      },
    });
  }
  async findByEmail(email: string): Promise<UserProps | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user as UserProps;
  }
  async findByUuid(uuid: string): Promise<UserProps | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        uuid,
      },
    });

    return user as UserProps;
  }
  async remove(uuid: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        uuid,
      },
    });
  }
}
