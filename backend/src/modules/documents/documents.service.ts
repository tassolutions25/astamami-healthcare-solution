import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(caregiverId?: string) {
    return this.prisma.caregiverDocument.findMany({
      where: caregiverId ? { caregiverId } : undefined,
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async findById(id: string) {
    const doc = await this.prisma.caregiverDocument.findUnique({ where: { id } });
    if (!doc) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return doc;
  }

  async recordDocument(data: any) {
    return this.prisma.caregiverDocument.create({
      data: {
        caregiverId: data.caregiverId,
        documentType: data.documentType || data.type || 'OTHER',
        fileName: data.fileName || data.title || 'document.pdf',
        fileUrl: data.fileUrl,
        fileSize: data.fileSize || 0,
        isVerified: false,
        notes: data.notes,
      },
    });
  }

  async verifyDocument(id: string, isVerified: boolean, reviewedBy?: string) {
    return this.prisma.caregiverDocument.update({
      where: { id },
      data: {
        isVerified,
        reviewedAt: isVerified ? new Date() : null,
        reviewedBy,
      },
    });
  }
}
