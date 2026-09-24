import { Module } from '@nestjs/common';
import { CarePlansService } from './care-plans.service.js';
import { CarePlansController } from './care-plans.controller.js';

@Module({
  controllers: [CarePlansController],
  providers: [CarePlansService],
  exports: [CarePlansService],
})
export class CarePlansModule {}
