import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class CaregiversService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.caregiver.findMany({
      include: {
        user: { select: { email: true, isActive: true, status: true } },
        documents: true,
        shifts: { take: 5, orderBy: { startDatetime: 'desc' } },
      },
    });
  }

  async findById(id: string) {
    const caregiver = await this.prisma.caregiver.findUnique({
      where: { id },
      include: {
        user: { select: { email: true, isActive: true, status: true } },
        documents: true,
        shifts: { orderBy: { startDatetime: 'desc' }, take: 20 },
      },
    });

    if (!caregiver) {
      throw new NotFoundException(`Caregiver with ID ${id} not found`);
    }

    return caregiver;
  }

  async findByUserId(userId: string) {
    const caregiver = await this.prisma.caregiver.findUnique({
      where: { userId },
      include: {
        shifts: { orderBy: { startDatetime: 'desc' }, take: 20 },
        documents: true,
      },
    });

    if (!caregiver) {
      throw new NotFoundException('Caregiver profile not found');
    }

    return caregiver;
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.caregiver.update({
      where: { id },
      data: { verificationStatus: status },
    });
  }
}
