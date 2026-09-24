import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class ConfigurationModuleService {
  constructor(private prisma: PrismaService) {}

  async getAllSettings() {
    return this.prisma.systemSetting.findMany();
  }

  async getSetting(key: string) {
    return this.prisma.systemSetting.findUnique({
      where: { key },
    });
  }

  async updateSetting(key: string, value: string, description?: string) {
    return this.prisma.systemSetting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });
  }
}
