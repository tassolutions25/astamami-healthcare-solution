import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async findAllShifts(caregiverId?: string) {
    return this.prisma.shift.findMany({
      where: caregiverId ? { caregiverId } : undefined,
      include: {
        caregiver: true,
        booking: {
          include: { client: true },
        },
      },
      orderBy: { startDatetime: 'asc' },
    });
  }

  async findShiftById(id: string) {
    const shift = await this.prisma.shift.findUnique({
      where: { id },
      include: {
        caregiver: true,
        booking: {
          include: { client: true },
        },
      },
    });

    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`);
    }

    return shift;
  }

  async assignCaregiverToShift(shiftId: string, caregiverId: string) {
    return this.prisma.shift.update({
      where: { id: shiftId },
      data: { caregiverId },
      include: {
        caregiver: true,
        booking: true,
      },
    });
  }
}
