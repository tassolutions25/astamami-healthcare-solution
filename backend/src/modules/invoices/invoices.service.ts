import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(clientId?: string) {
    return this.prisma.invoice.findMany({
      where: clientId ? { clientId } : undefined,
      include: {
        client: true,
        booking: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        booking: true,
        items: true,
        payments: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async create(data: any) {
    const total = data.totalAmount || data.amount || 0;
    return this.prisma.invoice.create({
      data: {
        invoiceNumber: data.invoiceNumber || `INV-${Date.now()}`,
        bookingId: data.bookingId,
        clientId: data.clientId,
        subtotal: data.subtotal || total,
        totalAmount: total,
        balance: total,
        currency: 'ETB',
        status: 'ISSUED',
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
}
