import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: any) {
    return this.prisma.booking.findMany({
      where: status ? { status } : undefined,
      include: {
        client: true,
        items: { include: { package: true } },
        assignments: { include: { caregiver: true } },
        shifts: true,
        invoice: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByClient(clientId: string) {
    return this.prisma.booking.findMany({
      where: { clientId },
      include: {
        items: { include: { package: true } },
        assignments: { include: { caregiver: true } },
        shifts: true,
        invoice: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        client: true,
        items: { include: { package: true } },
        assignments: { include: { caregiver: true } },
        shifts: true,
        carePlans: true,
        careNotes: true,
        invoice: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async create(data: any) {
    return this.prisma.booking.create({
      data: {
        referenceNumber: data.referenceNumber || `BK-${Date.now()}`,
        clientId: data.clientId,
        durationType: data.durationType || 'HOURLY',
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        serviceLocation: data.serviceLocation,
        notes: data.notes || data.specialNotes,
        status: 'REQUESTED',
      },
      include: {
        client: true,
        items: true,
      },
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }
}
