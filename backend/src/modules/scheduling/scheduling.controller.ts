import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SchedulingService } from './scheduling.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('scheduling')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Get('shifts')
  async findAllShifts(@Query('caregiverId') caregiverId?: string) {
    return this.schedulingService.findAllShifts(caregiverId);
  }

  @Get('shifts/:id')
  async findShiftById(@Param('id') id: string) {
    return this.schedulingService.findShiftById(id);
  }

  @Patch('shifts/:id/assign')
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async assignCaregiver(
    @Param('id') shiftId: string,
    @Body('caregiverId') caregiverId: string,
  ) {
    return this.schedulingService.assignCaregiverToShift(shiftId, caregiverId);
  }
}
