import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      take: 50,
    });
  }

  async sendInAppNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
    actionUrl?: string;
  }) {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        channel: 'IN_APP',
        title: data.title,
        body: data.message,
        type: data.type,
        metadata: data.actionUrl ? { actionUrl: data.actionUrl } : undefined,
      },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
      },
    });
  }

  // SMS is delayed as requested; this is a stub for future integration
  async sendSmsStub(phone: string, message: string) {
    this.logger.log(`[SMS Delayed - Local Mode] Message to ${phone}: ${message}`);
    return { sent: false, reason: 'SMS integration delayed per configuration' };
  }
}
