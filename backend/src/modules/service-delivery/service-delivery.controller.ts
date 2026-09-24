import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ServiceDeliveryService } from './service-delivery.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('service-delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceDeliveryController {
  constructor(private readonly serviceDeliveryService: ServiceDeliveryService) {}

  @Post('clock-in')
  @Roles('CAREGIVER')
  async clockIn(@Body() body: { shiftId: string; latitude?: number; longitude?: number }) {
    return this.serviceDeliveryService.clockIn(body.shiftId, body.latitude, body.longitude);
  }

  @Post('clock-out')
  @Roles('CAREGIVER')
  async clockOut(@Body() body: { shiftId: string; latitude?: number; longitude?: number }) {
    return this.serviceDeliveryService.clockOut(body.shiftId, body.latitude, body.longitude);
  }

  @Post('visit-notes')
  @Roles('CAREGIVER')
  async submitVisitNote(@Body() data: any) {
    return this.serviceDeliveryService.submitVisitNote(data);
  }
}
