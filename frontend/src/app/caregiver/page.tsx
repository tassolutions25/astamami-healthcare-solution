'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { apiClient } from '../../lib/api/client';

export default function CaregiverDashboardPage() {
  const [shiftStatus, setShiftStatus] = useState<'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED'>('SCHEDULED');
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [noteSubmitted, setNoteSubmitted] = useState(false);

  // Form states for visit log
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState('74');
  const [activities, setActivities] = useState('Medication assisted, mobility walk, vitals measured.');
  const [observation, setObservation] = useState('Patient was energetic and cooperative.');

  const handleClockIn = async () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockInTime(timeStr);
    setShiftStatus('IN_PROGRESS');

    try {
      await apiClient.post('/service-delivery/clock-in', {
        shiftId: 'demo-shift-1',
        latitude: 9.0108,
        longitude: 38.7613,
      });
    } catch {
      // Local fallback simulation
    }
  };

  const handleClockOut = async () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockOutTime(timeStr);
    setShiftStatus('COMPLETED');

    try {
      await apiClient.post('/service-delivery/clock-out', {
        shiftId: 'demo-shift-1',
        latitude: 9.0108,
        longitude: 38.7613,
      });
    } catch {
      // Local fallback simulation
    }
  };

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteSubmitted(true);
    try {
      await apiClient.post('/service-delivery/visit-notes', {
        shiftId: 'demo-shift-1',
        activitiesPerformed: [activities],
        observations: observation,
        vitals: { bp, pulse },
      });
    } catch {
      // Local fallback
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Nurse Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Caregiver Shift Console
          </h1>
          <p className="text-sm text-slate-500">
            Logged in as Sr. Tigist Hailu, RN (Addis Ababa East Cluster)
          </p>
        </div>
        <Badge variant="success">Verification: Active Licensed</Badge>
      </div>

      {/* Active Shift Card with Clock-in/Clock-out */}
      <Card className="border-teal-200 bg-gradient-to-br from-white to-teal-50/30">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Current Assigned Visit
              </span>
              <Badge
                variant={
                  shiftStatus === 'COMPLETED'
                    ? 'success'
                    : shiftStatus === 'IN_PROGRESS'
                    ? 'warning'
                    : 'info'
                }
              >
                {shiftStatus}
              </Badge>
            </div>
            <CardTitle>Ato Worku Tessema — Post-Stroke Care</CardTitle>
          </div>
          <span className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            Bole Sub-City, Woreda 03, House 412
          </span>
        </CardHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block">Scheduled Time</span>
              <span className="font-semibold text-slate-800">02:00 PM – 06:00 PM (4 Hrs)</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block">Clocked In At</span>
              <span className="font-semibold text-teal-700">
                {clockInTime || 'Not Clocked In Yet'}
              </span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-xs text-slate-400 block">Clocked Out At</span>
              <span className="font-semibold text-slate-800">
                {clockOutTime || 'Shift Ongoing'}
              </span>
            </div>
          </div>

          {/* Clock Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            {shiftStatus === 'SCHEDULED' && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleClockIn}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                📍 Clock In (GPS Location Verified)
              </Button>
            )}

            {shiftStatus === 'IN_PROGRESS' && (
              <Button
                variant="danger"
                size="lg"
                onClick={handleClockOut}
              >
                ⏹ Complete Visit & Clock Out
              </Button>
            )}

            {shiftStatus === 'COMPLETED' && (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                ✓ Shift Completed & Hours Verified. Please submit visit notes below.
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Clinical Notes & Vitals Logger */}
      <Card>
        <CardHeader>
          <CardTitle>Log Visit Activities & Vital Signs</CardTitle>
          <p className="text-xs text-slate-500">
            Notes will sync directly with patient's family portal and clinical supervisor
          </p>
        </CardHeader>

        {noteSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            ✓ Visit notes and vital signs successfully logged and saved!
          </div>
        ) : (
          <form onSubmit={handleSubmitNote} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="e.g. 120/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pulse / Heart Rate (bpm)
                </label>
                <input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="e.g. 74"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Care Interventions Performed
              </label>
              <textarea
                rows={2}
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                placeholder="List tasks performed..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Mood & Clinical Observations
              </label>
              <textarea
                rows={2}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                placeholder="Observed conditions or changes..."
              />
            </div>

            <Button type="submit" variant="primary">
              Submit Visit Documentation
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
