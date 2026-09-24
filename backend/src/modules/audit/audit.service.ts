import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(data: {
    userId?: string;
    action: any;
    entityType: string;
    entityId?: string;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        resourceType: data.entityType,
        resourceId: data.entityId,
        previousValue: data.oldData,
        newValue: data.newData,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async findAll() {
    return this.prisma.auditLog.findMany({
      include: {
        user: { select: { email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
