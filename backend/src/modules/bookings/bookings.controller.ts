import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async findAll(@Query('status') status?: any) {
    return this.bookingsService.findAll(status);
  }

  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string) {
    return this.bookingsService.findByClient(clientId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.bookingsService.create(data);
  }

  @Patch(':id/status')
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async updateStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.bookingsService.updateStatus(id, status);
  }
}
