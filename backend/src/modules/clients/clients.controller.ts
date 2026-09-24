import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR')
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get('me')
  @Roles('CLIENT')
  async getMyProfile(@CurrentUser('id') userId: string) {
    return this.clientsService.findByUserId(userId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'ADMIN', 'COORDINATOR', 'CAREGIVER')
  async findById(@Param('id') id: string) {
    return this.clientsService.findById(id);
  }
}
