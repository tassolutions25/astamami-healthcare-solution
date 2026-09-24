import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        invoice: {
          include: { client: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async recordManualPayment(data: {
    invoiceId: string;
    amount: number;
    paymentMethod: string;
    referenceNumber?: string;
    notes?: string;
  }) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: data.invoiceId },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const payment = await this.prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        currency: 'ETB',
        paymentMethod: data.paymentMethod,
        reference: data.referenceNumber || `TXN-${Date.now()}`,
        status: 'PAID',
        paidAt: new Date(),
        notes: data.notes || `Manually recorded payment via ${data.paymentMethod}`,
      },
    });

    // Update invoice status to PAID
    await this.prisma.invoice.update({
      where: { id: data.invoiceId },
      data: {
        status: 'PAID',
        amountPaid: data.amount,
        balance: 0,
      },
    });

    return payment;
  }
}
