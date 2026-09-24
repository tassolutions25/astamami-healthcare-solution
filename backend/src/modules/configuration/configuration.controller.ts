import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ConfigurationModuleService } from './configuration.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('configuration')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationModuleService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN')
  async getAllSettings() {
    return this.configService.getAllSettings();
  }

  @Get(':key')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async getSetting(@Param('key') key: string) {
    return this.configService.getSetting(key);
  }

  @Put(':key')
  @Roles('SUPER_ADMIN')
  async updateSetting(
    @Param('key') key: string,
    @Body() body: { value: string; description?: string },
  ) {
    return this.configService.updateSetting(key, body.value, body.description);
  }
}
