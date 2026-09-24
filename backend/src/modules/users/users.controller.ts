import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
