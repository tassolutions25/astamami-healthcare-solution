import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { ServiceCarousel } from '../components/ui/ServiceCarousel';
import { ROUTES } from '../lib/constants/routes';

const stats = [
  { value: '500+', label: 'Families Served' },
  { value: '120+', label: 'Certified Caregivers' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Care Availability' },
];




const portals = [
  { title: 'Care Coordinator Console', role: 'ADMIN / COORDINATOR', desc: 'Match patients with qualified nurses, track GPS clock-ins, review incident logs, and oversee billing.', href: '/admin/dashboard', cta: 'Open Admin Console', gradient: 'from-blue-700 to-teal-700' },
  { title: 'Client & Family Portal', role: 'PATIENTS & SPONSORS', desc: 'Track care schedules, review daily visit notes from nurses, view clinical vitals, and settle invoices.', href: '/client/dashboard', cta: 'Access Client Portal', gradient: 'from-teal-600 to-emerald-700' },
  { title: 'Caregiver & Nurse Hub', role: 'VERIFIED CAREGIVERS', desc: 'View scheduled shifts, clock-in with GPS verification, log clinical vitals, and submit daily notes.', href: '/caregiver/dashboard', cta: 'Caregiver Workspace', gradient: 'from-indigo-600 to-blue-700' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO - full-bleed image with dark overlay */}
      <section className="relative flex items-center justify-center overflow-hidden">
        <Image
          src="/images/caregiver_elderly_care_dark_1790232034597.jpg"
          alt="Astamami caregiver assisting elderly client at home"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-900/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center mt-8 gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Ethiopia's Premier Home Healthcare Network
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Compassionate Care{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                In the Comfort of Home
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 leading-relaxed">
              Astamami connects Ethiopian families and diaspora sponsors with certified nurses,
              professional caregivers, and personalized medical care plans — with full transparency and peace of mind.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" variant="primary">Request Care Assessment →</Button>
              </Link>
              <Link href="#about">
                <button className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </Link>
            </div>
            <div className="mt-16 flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-teal-300">{s.value}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      <ServiceCarousel />

      {/* ABOUT - 3-column layout matching reference design */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* LEFT COL — image with overlay action card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '480px' }}>
                <Image
                  src="/images/home_nurse_checkup_dark_1790232046806.jpg"
                  alt="Home nurse performing health checkup on elderly patient"
                  fill
                  className="object-cover"
                />
                {/* Clinically Verified badge — top right */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-base">🏥</div>
                  <div>
                    <p className="text-xs text-slate-500">Clinically Verified</p>
                    <p className="text-xs font-bold text-slate-900">Licensed Nurses Only</p>
                  </div>
                </div>
                {/* Book a Home Care Visit card — bottom right */}
                <div className="absolute bottom-6 right-6 bg-teal-700 rounded-2xl p-5 max-w-[180px] shadow-xl">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-3">📞</div>
                  <p className="text-white font-bold text-sm leading-snug mb-1">Book a Home Care Visit</p>
                  <p className="text-teal-200 text-xs font-medium">+251 911 000 000</p>
                </div>
              </div>
            </div>

            {/* MIDDLE COL — heading, text, feature items */}
            <div className="lg:pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3 italic">Why Astamami</p>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-5">
                Professional Healthcare,{' '}
                <span className="text-teal-600">Delivered at Your Door</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 text-sm">
                We combine clinical expertise with genuine compassion. Every caregiver on our platform is
                background-checked, professionally trained, and matched to your loved one's specific health needs.
              </p>
              <div className="space-y-6">
                {[
                  { icon: '✅', title: 'Verified Caregivers', text: 'Background-verified and licensed caregivers on every visit.' },
                  { icon: '📋', title: 'Personalized Plans', text: 'Individualized care plans reviewed by clinical coordinators.' },
                  { icon: '📍', title: 'GPS Accountability', text: 'GPS-confirmed visit check-ins for full transparency.' },
                  { icon: '💬', title: 'Family Reporting', text: 'Real-time reporting to families and diaspora sponsors.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-0.5">{item.title}</p>
                      <p className="text-slate-500 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link href={ROUTES.REGISTER}>
                  <Button size="lg" variant="primary">Get Started Today</Button>
                </Link>
              </div>
            </div>

            {/* RIGHT COL — mission, vision, quote cards */}
            <div className="space-y-5 lg:pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-teal-600 font-bold text-base mb-2">Our Mission</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  To deliver dignified, clinically-supervised home healthcare to every Ethiopian family — regardless of location.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-teal-600 font-bold text-base mb-2">Our Vision</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A future where every elderly and recovering patient in Ethiopia receives world-class care at home.
                </p>
              </div>
              <div className="bg-teal-700 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-3 right-4 text-5xl text-white/10 font-serif leading-none">"</div>
                <p className="text-white text-sm leading-relaxed mb-5 relative z-10">
                  "Astamami gave my father the dignity and care he deserved — right in our home. Our family finally had peace of mind."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">M</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Mekdes A.</p>
                    <p className="text-teal-300 text-xs">Client Family, Addis Ababa</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* HANDS OF CARE BANNER */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/hands_of_care_1790231960387.jpg"
            alt="Caregiver holding hands with elderly patient — compassion and trust"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/60 to-transparent" />
          <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-4">Our Promise</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">Every Touch Is Built on Trust</h2>
              <p className="text-slate-200 leading-relaxed mb-8">
                We believe every elderly person deserves dignity, warmth, and professional care.
                Our caregivers are more than nurses — they are companions who bring comfort and confidence to every family they serve.
              </p>
              <Link href={ROUTES.REGISTER}><Button size="lg" variant="primary">Join Astamami Today</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* PORTALS */}
      <section id="portals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">Integrated Multi-Stakeholder Platform</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Built for Families, Clinicians & Operations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((p) => (
              <div key={p.title} className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className={`p-8 bg-gradient-to-br ${p.gradient} text-white`}>
                  <span className="text-xs font-bold tracking-widest uppercase opacity-80 block mb-2">{p.role}</span>
                  <h3 className="text-xl font-extrabold">{p.title}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{p.desc}</p>
                  <Link href={p.href} className="block">
                    <Button variant="outline" className="w-full">{p.cta} →</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative h-[380px]">
          <Image
            src="/images/caregiver_elderly_care_1790231935832.jpg"
            alt="Professional caregiver ready to serve your family"
            fill
            className="object-cover object-top opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-slate-900/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Start Your Journey</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 max-w-2xl leading-tight">Ready to Bring Expert Care Home?</h2>
            <p className="text-slate-400 mb-8 max-w-xl">
              Register today and our care coordinators will reach out within 24 hours to build a customized plan for your loved one.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={ROUTES.REGISTER}><Button size="lg" variant="primary">Request a Free Assessment</Button></Link>
              <Link href="#portals">
                <button className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">View Portals</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
