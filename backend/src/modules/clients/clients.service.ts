import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.findMany({
      include: {
        user: { select: { email: true, isActive: true, status: true } },
        bookings: { take: 5, orderBy: { createdAt: 'desc' } },
        carePlans: { where: { status: 'ACTIVE' }, take: 1 },
      },
    });
  }

  async findById(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        user: { select: { email: true, isActive: true, status: true } },
        bookings: true,
        carePlans: true,
        familyMembers: true,
        documents: true,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async findByUserId(userId: string) {
    const client = await this.prisma.client.findUnique({
      where: { userId },
      include: {
        bookings: { orderBy: { createdAt: 'desc' } },
        carePlans: true,
        familyMembers: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client profile not found');
    }

    return client;
  }
}
