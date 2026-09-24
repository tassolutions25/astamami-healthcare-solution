import { Module } from '@nestjs/common';
import { ConfigurationModuleService } from './configuration.service.js';
import { ConfigurationController } from './configuration.controller.js';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationModuleService],
  exports: [ConfigurationModuleService],
})
export class ConfigurationModule {}
