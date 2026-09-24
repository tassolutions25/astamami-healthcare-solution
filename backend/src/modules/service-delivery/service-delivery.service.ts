import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class ServiceDeliveryService {
  constructor(private prisma: PrismaService) {}

  async clockIn(shiftId: string, latitude?: number, longitude?: number) {
    const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } });
    if (!shift) {
      throw new BadRequestException('Shift not found');
    }

    return this.prisma.shift.update({
      where: { id: shiftId },
      data: {
        checkInAt: new Date(),
        status: 'IN_PROGRESS',
        location: latitude && longitude ? `${latitude}, ${longitude}` : shift.location,
      },
    });
  }

  async clockOut(shiftId: string, latitude?: number, longitude?: number) {
    const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } });
    if (!shift) {
      throw new BadRequestException('Shift not found');
    }

    return this.prisma.shift.update({
      where: { id: shiftId },
      data: {
        checkOutAt: new Date(),
        status: 'COMPLETED',
      },
    });
  }

  async submitVisitNote(data: any) {
    let bookingId = data.bookingId;
    let caregiverId = data.caregiverId;

    if (data.shiftId && (!bookingId || !caregiverId)) {
      const shift = await this.prisma.shift.findUnique({ where: { id: data.shiftId } });
      if (shift) {
        bookingId = bookingId || shift.bookingId;
        caregiverId = caregiverId || shift.caregiverId;
      }
    }

    if (!bookingId || !caregiverId) {
      throw new BadRequestException('Booking ID and Caregiver ID are required for care notes');
    }

    return this.prisma.careNote.create({
      data: {
        bookingId,
        caregiverId,
        noteText: data.observations || data.noteText || 'Routine care visit documented.',
        noteType: data.noteType || 'VISIT_LOG',
      },
    });
  }
}
