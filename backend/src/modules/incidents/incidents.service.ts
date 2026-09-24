import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.incident.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    return incident;
  }

  async report(data: any) {
    return this.prisma.incident.create({
      data: {
        bookingId: data.bookingId,
        caregiverId: data.caregiverId,
        reportedBy: data.reportedBy || data.reportedById || 'SYSTEM',
        severity: data.severity || 'MEDIUM',
        description: data.description || data.title || 'Incident reported',
        status: 'OPEN',
      },
    });
  }

  async updateResolution(id: string, status: any, resolutionNotes?: string) {
    return this.prisma.incident.update({
      where: { id },
      data: {
        status,
        resolution: resolutionNotes,
        resolvedAt: status === 'RESOLVED' || status === 'CLOSED' ? new Date() : undefined,
      },
    });
  }
}
