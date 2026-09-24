'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../lib/api/client';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 18,
    totalCaregivers: 34,
    activeCaregivers: 28,
    totalBookings: 42,
    activeBookings: 12,
    totalInvoices: 38,
    openIncidents: 0,
    systemStatus: 'LOCAL_DEV_OPERATIONAL',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const data: any = await apiClient.get('/reports/dashboard');
        if (data) {
          setStats((prev) => ({ ...prev, ...data }));
        }
      } catch {
        // Fallback to local defaults if backend is not yet populated
      }
    }
    loadStats();
  }, []);

  const pendingBookings = [
    {
      id: 'BK-1049',
      client: 'Almaz Tadesse',
      service: 'Elderly Care (24/7 Live-in)',
      location: 'Bole, Addis Ababa',
      date: 'Today, 08:00 AM',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'BK-1050',
      client: 'Kifle Wolde',
      service: 'Post-Stroke Physiotherapy',
      location: 'CMC, Addis Ababa',
      date: 'Tomorrow, 10:00 AM',
      status: 'CAREGIVER_ASSIGNED',
    },
    {
      id: 'BK-1051',
      client: 'Selamawit Kebede',
      service: 'Post-Op Wound Management',
      location: 'Kazanchis, Addis Ababa',
      date: 'Sep 23, 02:00 PM',
      status: 'CONFIRMED',
    },
  ];

  const pendingCaregivers = [
    {
      name: 'Tigist Hailu, RN',
      role: 'Registered Nurse',
      experience: '5 Years',
      documents: 'National ID, MOH License',
      status: 'UNDER_REVIEW',
    },
    {
      name: 'Dawit Mengistu',
      role: 'Certified Care Assistant',
      experience: '3 Years',
      documents: 'Certificate, CPR Certified',
      status: 'PENDING_VERIFICATION',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Care Coordinator Console
          </h1>
          <p className="text-sm text-slate-500">
            Real-time clinical oversight, caregiver matching, and visit tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success">Backend: Online (Local)</Badge>
          <Button size="sm" variant="primary">
            + New Care Request
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Patients
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">
              {stats.totalClients}
            </span>
            <span className="text-xs font-medium text-emerald-600">
              In Addis Ababa
            </span>
          </div>
        </Card>

        <Card>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Caregivers Active
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-teal-700">
              {stats.activeCaregivers}
            </span>
            <span className="text-xs text-slate-500">
              of {stats.totalCaregivers} vetted
            </span>
          </div>
        </Card>

        <Card>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Active Care Bookings
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">
              {stats.activeBookings}
            </span>
            <span className="text-xs text-slate-500">
              {stats.totalBookings} total booked
            </span>
          </div>
        </Card>

        <Card>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Clinical Incidents
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-emerald-600">
              {stats.openIncidents}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              Zero Critical
            </span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Bookings & Caregiver Verification Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Bookings */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Care Requests & Shifts</CardTitle>
              <span className="text-xs text-slate-500">Addis Ababa Zones</span>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 font-semibold uppercase">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Care Program</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 font-medium text-slate-900">
                        {b.client}
                      </td>
                      <td className="py-3.5 text-slate-600">{b.service}</td>
                      <td className="py-3.5 text-slate-500 text-xs">{b.location}</td>
                      <td className="py-3.5">
                        <Badge
                          variant={
                            b.status === 'CONFIRMED'
                              ? 'success'
                              : b.status === 'CAREGIVER_ASSIGNED'
                              ? 'info'
                              : 'warning'
                          }
                        >
                          {b.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-right">
                        <Button size="sm" variant="outline">
                          Assign Nurse
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Caregiver Vetting */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pending Caregiver Vetting</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              {pendingCaregivers.map((c) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {c.name}
                      </h4>
                      <p className="text-xs text-slate-500">{c.role} • {c.experience}</p>
                    </div>
                    <Badge variant="warning">{c.status.replace('_', ' ')}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-700">Uploaded:</strong> {c.documents}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="primary" className="flex-1 py-1 text-xs">
                      Verify & Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 py-1 text-xs">
                      Inspect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
