import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      include: {
        packages: true,
      },
    });
  }

  async findCategories() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      select: {
        category: true,
      },
      distinct: ['category'],
    });
  }

  async findById(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { packages: true },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }
}
