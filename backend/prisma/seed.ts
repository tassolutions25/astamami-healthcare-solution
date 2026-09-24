import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://openpg:openpgpwd@localhost:5432/astamami_db';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Astamami Care Alliance database...');

  // 1. Roles
  const roles = [
    { name: 'SUPER_ADMIN', description: 'Full system control' },
    { name: 'ADMIN', description: 'Operational administration' },
    { name: 'COORDINATOR', description: 'Clinical & shift coordinator' },
    { name: 'CAREGIVER', description: 'Certified nurse / caregiver' },
    { name: 'CLIENT', description: 'Patient or family sponsor' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }

  // 2. Demo Users
  const passwordHash = await bcrypt.hash('Password@123', 10);

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const clientRole = await prisma.role.findUnique({ where: { name: 'CLIENT' } });
  const caregiverRole = await prisma.role.findUnique({ where: { name: 'CAREGIVER' } });

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@astamami.com' },
    update: {},
    create: {
      email: 'admin@astamami.com',
      passwordHash,
      phone: '+251911000001',
      isActive: true,
      roles: {
        create: { roleId: adminRole!.id },
      },
    },
  });

  // Client User
  await prisma.user.upsert({
    where: { email: 'client@astamami.com' },
    update: {},
    create: {
      email: 'client@astamami.com',
      passwordHash,
      phone: '+251911000002',
      isActive: true,
      roles: {
        create: { roleId: clientRole!.id },
      },
      client: {
        create: {
          fullName: 'Ato Worku Tessema',
          phone: '+251911000002',
          email: 'client@astamami.com',
          address: 'Bole Sub-City, Woreda 03',
          city: 'Addis Ababa',
        },
      },
    },
  });

  // Caregiver User
  await prisma.user.upsert({
    where: { email: 'caregiver@astamami.com' },
    update: {},
    create: {
      email: 'caregiver@astamami.com',
      passwordHash,
      phone: '+251911000003',
      isActive: true,
      roles: {
        create: { roleId: caregiverRole!.id },
      },
      caregiver: {
        create: {
          fullName: 'Sr. Tigist Hailu, RN',
          phone: '+251911000003',
          email: 'caregiver@astamami.com',
          verificationStatus: 'ACTIVE',
          professionalRole: 'REGISTERED_NURSE',
          experienceYears: 5,
          skills: ['Medication Administration', 'Wound Dressing', 'Vitals Monitoring', 'Catheter Care'],
          languages: ['Amharic', 'English', 'Afaan Oromoo'],
          serviceAreas: ['Bole', 'Kazanchis', 'CMC', 'Yeka'],
        },
      },
    },
  });

  // 3. Core Services
  const elderlyService = await prisma.service.create({
    data: {
      name: 'Elderly & Assisted Living Care',
      category: 'Elderly Care',
      description: 'Daily living assistance, mobility support, and companionship for seniors.',
      packages: {
        create: {
          name: 'Comprehensive Daily Companion',
          description: 'Full day physical support, meal preparation, medication reminders, and vitals recording.',
          features: ['Daily vitals logging', 'Hygiene assistance', 'Prescription reminders'],
          pricing: {
            create: {
              durationType: 'DAILY',
              unitPrice: 2200,
              currency: 'ETB',
            },
          },
        },
      },
    },
  });

  console.log('Seeded Service:', elderlyService.name);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
