'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function ClientDashboardPage() {
  const patient = {
    name: 'Ato Worku Tessema (Father)',
    age: 76,
    condition: 'Post-Stroke Mobility & Hypertension',
    caregiver: 'Sr. Tigist Hailu, RN',
    caregiverPhone: '+251 912 34 56 78',
    assignedPlan: 'Comprehensive Elderly Assisted Care',
    nextVisit: 'Today at 02:00 PM (4 Hours)',
  };

  const recentVitals = [
    { label: 'Blood Pressure', value: '125/82 mmHg', status: 'Normal', variant: 'success' as const },
    { label: 'Heart Rate', value: '72 bpm', status: 'Normal', variant: 'success' as const },
    { label: 'Blood Glucose', value: '110 mg/dL', status: 'Optimal', variant: 'success' as const },
    { label: 'Mobility Walk', value: '15 mins assisted', status: 'Goal Met', variant: 'info' as const },
  ];

  const recentVisitNotes = [
    {
      date: 'Yesterday, Sep 20, 2026',
      nurse: 'Sr. Tigist Hailu, RN',
      summary: 'Administered prescribed midday hypertensive medication. Performed 20-minute guided leg flexion exercises. Patient was alert, cheerful, and ate full lunch.',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold block mb-1">
            Active Care Package
          </span>
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-sm text-slate-300 mt-1">
            {patient.condition} • Supervised by Astamami Clinical Team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Contact Nurse
          </Button>
          <Button variant="primary" size="sm">
            Modify Schedule
          </Button>
        </div>
      </div>

      {/* Grid: Primary Nurse & Next Visit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Next Scheduled Care Visit</CardTitle>
          </CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-teal-50/50 rounded-xl border border-teal-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="success">Confirmed Shift</Badge>
                <span className="text-xs text-slate-500">Addis Ababa Time</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{patient.nextVisit}</p>
              <p className="text-xs text-slate-600">Assigned Nurse: {patient.caregiver}</p>
            </div>
            <Button size="sm" variant="outline">
              View Visit Checklist
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primary Caregiver</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg">
                TH
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{patient.caregiver}</p>
                <p className="text-xs text-slate-500">MOH Licensed • 5 Yrs Exp</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
              Direct Phone: <strong className="text-slate-900">{patient.caregiverPhone}</strong>
            </p>
          </div>
        </Card>
      </div>

      {/* Latest Vitals & Clinical Observation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Latest Recorded Vital Signs</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-4">
            {recentVitals.map((v) => (
              <div key={v.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 block mb-1">{v.label}</span>
                <span className="text-lg font-bold text-slate-900 block mb-1">
                  {v.value}
                </span>
                <Badge variant={v.variant}>{v.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Caregiver Visit Notes (Clinical Log)</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {recentVisitNotes.map((note) => (
              <div key={note.date} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{note.nurse}</span>
                  <span className="text-slate-400">{note.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "{note.summary}"
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
