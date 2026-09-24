import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(@Query('clientId') clientId?: string) {
    return this.invoicesService.findAll(clientId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.invoicesService.findById(id);
  }

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN')
  async create(@Body() data: any) {
    return this.invoicesService.create(data);
  }
}
