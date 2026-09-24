import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { IncidentsService } from './incidents.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('incidents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.incidentsService.findById(id);
  }

  @Post()
  async report(@Body() data: any) {
    return this.incidentsService.report(data);
  }

  @Patch(':id/resolution')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async updateResolution(
    @Param('id') id: string,
    @Body() body: { status: any; resolutionNotes?: string },
  ) {
    return this.incidentsService.updateResolution(id, body.status, body.resolutionNotes);
  }
}
