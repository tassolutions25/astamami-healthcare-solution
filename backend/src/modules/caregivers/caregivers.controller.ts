import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { CaregiversService } from './caregivers.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@Controller('caregivers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CaregiversController {
  constructor(private readonly caregiversService: CaregiversService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async findAll() {
    return this.caregiversService.findAll();
  }

  @Get('me')
  @Roles('CAREGIVER')
  async getMyProfile(@CurrentUser('id') userId: string) {
    return this.caregiversService.findByUserId(userId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async findById(@Param('id') id: string) {
    return this.caregiversService.findById(id);
  }

  @Patch(':id/status')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async updateStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.caregiversService.updateStatus(id, status);
  }
}
