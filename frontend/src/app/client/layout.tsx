import React from 'react';
import { DashboardSidebar, NavItem } from '../../components/layout/DashboardSidebar';
import { ROUTES } from '../../lib/constants/routes';

const clientNav: NavItem[] = [
  { label: 'My Care Overview', href: ROUTES.CLIENT.DASHBOARD },
  { label: 'Care Plan & Goals', href: ROUTES.CLIENT.CARE_PLAN },
  { label: 'Care Visits & History', href: ROUTES.CLIENT.BOOKINGS },
  { label: 'Invoices & Receipts', href: ROUTES.CLIENT.INVOICES },
  { label: 'Request New Care', href: ROUTES.CLIENT.NEW_BOOKING, badge: 'Book' },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar portalTitle="Family Portal" items={clientNav} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
