import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service.js';
import { Public } from '../../common/decorators/public.decorator.js';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @Public()
  @Get('categories')
  async findCategories() {
    return this.servicesService.findCategories();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.servicesService.findById(id);
  }
}
