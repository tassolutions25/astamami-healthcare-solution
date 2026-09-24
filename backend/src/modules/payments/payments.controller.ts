import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN')
  async findAll() {
    return this.paymentsService.findAll();
  }

  @Post('record')
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async recordPayment(
    @Body()
    data: {
      invoiceId: string;
      amount: number;
      paymentMethod: string;
      referenceNumber?: string;
      notes?: string;
    },
  ) {
    return this.paymentsService.recordManualPayment(data);
  }
}
