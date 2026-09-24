import { Module } from '@nestjs/common';
import { CaregiversService } from './caregivers.service.js';
import { CaregiversController } from './caregivers.controller.js';

@Module({
  controllers: [CaregiversController],
  providers: [CaregiversService],
  exports: [CaregiversService],
})
export class CaregiversModule {}
