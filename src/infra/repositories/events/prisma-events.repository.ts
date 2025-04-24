import { Injectable } from '@nestjs/common';
import { EventProps } from 'src/domain/entities/event/event.contact';
import { IEventRepository } from 'src/domain/repositories/event.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaEventsRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(event: EventProps): Promise<void> {
    await this.prisma.event.create({
      data: {
        createdAt: event.createdAt,
        date: event.date,
        name: event.name,
        updatedAt: event.updatedAt,
        allDay: event.allDay,
        endsOf: event.endsOf,
        startsOf: event.startsOf,
        tagUuid: event.tagUuid,
        uuid: event.uuid,
      },
    });
  }
  async remove(uuid: string): Promise<void> {
    await this.prisma.event.delete({
      where: {
        uuid,
      },
    });
  }
  async update(event: Omit<EventProps, 'Tag'>): Promise<void> {
    await this.prisma.event.update({
      data: {
        allDay: event.allDay,
        createdAt: event.createdAt,
        date: event.date,
        endsOf: event.endsOf,
        name: event.name,
        startsOf: event.startsOf,
        tagUuid: event.tagUuid,
        updatedAt: new Date(),
      },
      where: {
        uuid: event.uuid,
      },
    });
  }
  async assign(userUuid: string, eventUuid: string): Promise<void> {
    await this.prisma.assignedEventToUsers.create({
      data: {
        eventUuid,
        userUuid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  async removeAssignment(userUuid: string, eventUuid: string): Promise<void> {
    const assign = await this.prisma.assignedEventToUsers.findFirst({
      where: {
        userUuid,
        eventUuid,
      },
    });

    await this.prisma.assignedEventToUsers.delete({
      where: {
        uuid: assign.uuid,
      },
    });
  }
  async findByUuid(uuid: string): Promise<EventProps | null> {
    const event = await this.prisma.event.findFirst({
      where: {
        uuid,
      },
    });
    return event ?? null;
  }

  async findAll(userUuid: string): Promise<EventProps[] | null> {
    const events = await this.prisma.event.findMany({
      include: {
        Tag: true,
        AssignedEventToUsers: {
          select: {
            user: true,
            event: true,
            userUuid: true,
            uuid: true,
          },
        },
      },

      where: {
        AssignedEventToUsers: {
          some: {
            userUuid,
          },
        },
      },
    });

    return events ?? null;
  }

  async assignMany(
    input: { userEmail: string; eventUuid: string }[],
  ): Promise<void> {
    input.map(async (item) => {
      const alreadyExistsUser = await this.prisma.user.findFirst({
        where: {
          email: item.userEmail,
        },
      });
      if (!alreadyExistsUser) return;
      await this.prisma.assignedEventToUsers.createMany({
        data: input.map((item) => ({
          createdAt: new Date(),
          updatedAt: new Date(),
          userUuid: alreadyExistsUser.uuid,
          eventUuid: item.eventUuid,
        })),
      });
    });
  }
}
