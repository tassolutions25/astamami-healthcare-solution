import { Module } from '@nestjs/common';
import { ServiceDeliveryService } from './service-delivery.service.js';
import { ServiceDeliveryController } from './service-delivery.controller.js';

@Module({
  controllers: [ServiceDeliveryController],
  providers: [ServiceDeliveryService],
  exports: [ServiceDeliveryService],
})
export class ServiceDeliveryModule {}
