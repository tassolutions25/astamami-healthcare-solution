import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.js';
import { PrismaModule } from './common/prisma/prisma.module.js';

// Domain Modules
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ClientsModule } from './modules/clients/clients.module.js';
import { CaregiversModule } from './modules/caregivers/caregivers.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { BookingsModule } from './modules/bookings/bookings.module.js';
import { SchedulingModule } from './modules/scheduling/scheduling.module.js';
import { ServiceDeliveryModule } from './modules/service-delivery/service-delivery.module.js';
import { CarePlansModule } from './modules/care-plans/care-plans.module.js';
import { InvoicesModule } from './modules/invoices/invoices.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { IncidentsModule } from './modules/incidents/incidents.module.js';
import { DocumentsModule } from './modules/documents/documents.module.js';
import { ReportsModule } from './modules/reports/reports.module.js';
import { AuditModule } from './modules/audit/audit.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { ConfigurationModule } from './modules/configuration/configuration.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    CaregiversModule,
    ServicesModule,
    BookingsModule,
    SchedulingModule,
    ServiceDeliveryModule,
    CarePlansModule,
    InvoicesModule,
    PaymentsModule,
    IncidentsModule,
    DocumentsModule,
    ReportsModule,
    AuditModule,
    NotificationsModule,
    ConfigurationModule,
  ],
})
export class AppModule {}
