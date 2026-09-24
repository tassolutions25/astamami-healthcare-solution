import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class CarePlansService {
  constructor(private prisma: PrismaService) {}

  async findByClientId(clientId: string) {
    return this.prisma.carePlan.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const carePlan = await this.prisma.carePlan.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });

    if (!carePlan) {
      throw new NotFoundException(`Care plan with ID ${id} not found`);
    }

    return carePlan;
  }

  async create(data: any) {
    return this.prisma.carePlan.create({
      data: {
        clientId: data.clientId,
        bookingId: data.bookingId,
        objectives: data.objectives || data.title || 'Personalized Care Plan',
        instructions: data.instructions || data.specialInstructions,
        emergencyInfo: data.emergencyInfo,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        reviewDate: data.reviewDate ? new Date(data.reviewDate) : undefined,
        status: data.status || 'ACTIVE',
      },
    });
  }
}
