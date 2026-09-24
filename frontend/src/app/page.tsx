import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { ROUTES } from '../lib/constants/routes';

export default function HomePage() {
  const services = [
    {
      title: 'Elderly & Dementia Care',
      desc: 'Assistance with daily living activities, mobility, medication reminders, and cognitive companionship.',
      icon: '👴',
      badge: 'Popular',
    },
    {
      title: 'Post-Operative Recovery',
      desc: 'Clinical wound dressing, vitals monitoring, pain management, and coordinated doctor follow-ups.',
      icon: '🩺',
      badge: 'Clinical',
    },
    {
      title: 'Chronic Disease Management',
      desc: 'Structured care for diabetes, hypertension, stroke recovery, and respiratory conditions.',
      icon: '📊',
      badge: 'Specialized',
    },
    {
      title: 'Maternal & Newborn Care',
      desc: 'Postpartum assistance, newborn feeding, infant hygiene, and maternal recovery support.',
      icon: '👶',
      badge: 'Family',
    },
  ];

  const portals = [
    {
      title: 'Care Coordinator Console',
      role: 'ADMIN / COORDINATOR',
      desc: 'Match patients with qualified nurses, track GPS clock-ins, review incident logs, and oversee billing.',
      href: ROUTES.ADMIN.DASHBOARD,
      cta: 'Open Admin Console',
      color: 'from-blue-600 to-teal-700',
    },
    {
      title: 'Client & Family Portal',
      role: 'PATIENTS & SPONSORS',
      desc: 'Track care schedules, review daily visit notes from nurses, view clinical vitals, and settle invoices.',
      href: ROUTES.CLIENT.DASHBOARD,
      cta: 'Access Client Portal',
      color: 'from-teal-600 to-emerald-700',
    },
    {
      title: 'Caregiver & Nurse Hub',
      role: 'VERIFIED CAREGIVERS',
      desc: 'View scheduled shifts, clock-in with GPS verification, log clinical vitals, and submit daily notes.',
      href: ROUTES.CAREGIVER.DASHBOARD,
      cta: 'Caregiver Workspace',
      color: 'from-indigo-600 to-blue-700',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              Ethiopia’s Premier Home Healthcare Network
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Compassionate, Clinically Supervised Care{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">
                In the Comfort of Home
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Astamami connects Ethiopian families and diaspora sponsors with certified nurses, professional caregivers, and personalized medical care plans with transparency and peace of mind.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" variant="primary">
                  Request Care Assessment
                </Button>
              </Link>
              <Link href="#portals">
                <Button size="lg" variant="outline">
                  Explore Portals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
              Comprehensive Care Programs
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900">
              Tailored to Your Loved One’s Exact Needs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="hover:border-teal-300 transition-all hover:shadow-md">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-base">{s.title}</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  {s.badge}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Showcase */}
      <section id="portals" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
              Integrated Multi-Stakeholder Platform
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900">
              Built for Families, Clinicians & Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className={`p-6 bg-gradient-to-r ${p.color} text-white`}>
                  <span className="text-xs font-semibold tracking-wider uppercase opacity-90 block mb-1">
                    {p.role}
                  </span>
                  <h4 className="text-xl font-bold">{p.title}</h4>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {p.desc}
                  </p>
                  <Link href={p.href} className="block">
                    <Button variant="outline" className="w-full">
                      {p.cta} →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
