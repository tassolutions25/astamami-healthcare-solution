import React from 'react';
import { DashboardSidebar, NavItem } from '../../components/layout/DashboardSidebar';
import { ROUTES } from '../../lib/constants/routes';

const adminNav: NavItem[] = [
  { label: 'Overview', href: ROUTES.ADMIN.DASHBOARD },
  { label: 'Caregivers & Nurses', href: ROUTES.ADMIN.CAREGIVERS, badge: 'Vetting' },
  { label: 'Clients & Patients', href: ROUTES.ADMIN.CLIENTS },
  { label: 'Bookings & Requests', href: ROUTES.ADMIN.BOOKINGS },
  { label: 'Shifts & Rosters', href: ROUTES.ADMIN.SCHEDULES },
  { label: 'Invoices & Revenue', href: ROUTES.ADMIN.INVOICES },
  { label: 'Incident Reports', href: ROUTES.ADMIN.INCIDENTS },
  { label: 'Clinical Reports', href: ROUTES.ADMIN.REPORTS },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar portalTitle="Coordinator" items={adminNav} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
