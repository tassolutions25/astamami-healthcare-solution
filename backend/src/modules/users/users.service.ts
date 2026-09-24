import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        status: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: { include: { role: true } },
        client: true,
        caregiver: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
