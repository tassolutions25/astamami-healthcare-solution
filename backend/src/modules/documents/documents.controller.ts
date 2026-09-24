import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(@Query('caregiverId') caregiverId?: string) {
    return this.documentsService.findAll(caregiverId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @Post()
  async recordDocument(@Body() data: any) {
    return this.documentsService.recordDocument(data);
  }

  @Patch(':id/verify')
  @Roles('SUPER_ADMIN', 'ADMIN')
  async verifyDocument(
    @Param('id') id: string,
    @Body('isVerified') isVerified: boolean,
  ) {
    return this.documentsService.verifyDocument(id, isVerified);
  }
}
