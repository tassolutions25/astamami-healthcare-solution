import React from 'react';
import { DashboardSidebar, NavItem } from '../../components/layout/DashboardSidebar';
import { ROUTES } from '../../lib/constants/routes';

const caregiverNav: NavItem[] = [
  { label: 'My Shifts Today', href: ROUTES.CAREGIVER.DASHBOARD },
  { label: 'Upcoming Schedule', href: ROUTES.CAREGIVER.SHIFTS },
  { label: 'Log Visit Notes', href: ROUTES.CAREGIVER.VISIT_NOTES, badge: 'Vitals' },
  { label: 'Nurse Profile & Docs', href: ROUTES.CAREGIVER.PROFILE },
];

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar portalTitle="Caregiver Hub" items={caregiverNav} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
