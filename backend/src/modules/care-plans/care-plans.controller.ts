import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CarePlansService } from './care-plans.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('care-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarePlansController {
  constructor(private readonly carePlansService: CarePlansService) {}

  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string) {
    return this.carePlansService.findByClientId(clientId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.carePlansService.findById(id);
  }

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async create(@Body() data: any) {
    return this.carePlansService.create(data);
  }
}
