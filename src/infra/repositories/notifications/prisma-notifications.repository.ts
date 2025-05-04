import { Injectable } from '@nestjs/common';
import { NotificationProps } from 'src/domain/entities/notification/notification.contact';
import { INotificationsRepository } from 'src/domain/repositories/notification.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaNotificaitonsRepository implements INotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async send(input: NotificationProps): Promise<void> {
    await this.prisma.notification.create({
      data: {
        createdAt: new Date(),
        message: input.message,
        NotificationType: input.NotificationType,
        isRead: false,
        NotificationsToUsers: {
          createMany: {
            data: input.NotificationsToUsers.map((notificationsToUser) => {
              return {
                userUuid: notificationsToUser.userUuid,
                isSender: notificationsToUser.isSender,
                createdAt: new Date(),
              };
            }),
            skipDuplicates: true,
          },
        },
      },
    });
  }
  async findAll(userUuid: string): Promise<NotificationProps[] | null> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        NotificationsToUsers: {
          some: {
            userUuid,
            isSender: false,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        NotificationsToUsers: {
          select: {
            createdAt: true,
            isSender: true,
            notificationUuid: true,
            userUuid: true,
            uuid: true,
            user: true,
          },
        },
      },
    });

    return (notifications as NotificationProps[]) ?? null;
  }

  async findByUuid(uuid: string): Promise<NotificationProps | null> {
    const notification = await this.prisma.notification.findFirst({
      where: {
        uuid,
      },
    });
    return notification ?? null;
  }

  async markAsRead(uuid: string): Promise<void> {
    await this.prisma.notification.update({
      where: {
        uuid,
      },
      data: {
        isRead: true,
      },
    });
  }
}
