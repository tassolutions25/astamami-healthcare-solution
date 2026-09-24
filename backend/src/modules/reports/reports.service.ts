import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardStats() {
    const [
      totalClients,
      totalCaregivers,
      activeCaregivers,
      totalBookings,
      activeBookings,
      totalInvoices,
      openIncidents,
    ] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.caregiver.count(),
      this.prisma.caregiver.count({ where: { verificationStatus: 'ACTIVE' } }),
      this.prisma.booking.count(),
      this.prisma.booking.count({
        where: {
          status: { in: ['CONFIRMED', 'CAREGIVER_ASSIGNED', 'IN_PROGRESS'] },
        },
      }),
      this.prisma.invoice.count(),
      this.prisma.incident.count({
        where: { status: { in: ['OPEN', 'UNDER_REVIEW'] } },
      }),
    ]);

    return {
      totalClients,
      totalCaregivers,
      activeCaregivers,
      totalBookings,
      activeBookings,
      totalInvoices,
      openIncidents,
      systemStatus: 'ONLINE_LOCAL',
    };
  }
}
