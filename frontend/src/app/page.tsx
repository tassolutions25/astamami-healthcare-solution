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




const portalItems = [
  {
    title: 'Care Coordinator',
    desc: 'Match nurses, track GPS clock-ins & oversee clinical triage',
    cta: 'Open Console',
    href: '/admin/dashboard',
    icon: (
      <svg className="w-8 h-8 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 3h15a1.5 1.5 0 0 1 1.5 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3z" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="m7 9 3 3 2-2 5 5" />
      </svg>
    ),
  },
  {
    title: 'Client & Family',
    desc: 'Review care visits, track vitals & settle invoices with ease',
    cta: 'Access Portal',
    href: '/client/dashboard',
    icon: (
      <svg className="w-8 h-8 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 5v4" />
        <path d="M10 7h4" />
      </svg>
    ),
  },
  {
    title: 'Caregiver & Nurse',
    desc: 'View shifts, clock-in with GPS & submit daily patient notes',
    cta: 'Caregiver Hub',
    href: '/caregiver/dashboard',
    icon: (
      <svg className="w-8 h-8 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M16 11h6" />
      </svg>
    ),
  },
  {
    title: 'Diaspora Sponsors',
    desc: 'Transparent care oversight & direct remote patient funding',
    cta: 'Sponsor Care',
    href: ROUTES.REGISTER,
    icon: (
      <svg className="w-8 h-8 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO - full-bleed image with default 640px height and refined overlay */}
      <section className="relative w-full h-[580px] flex items-center overflow-hidden">
        <Image
          src="/images/caregiver_elderly_care_dark_1790232034597.jpg"
          alt="Astamami caregiver assisting elderly client at home"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Cinematic gradient overlay — clear visibility of caregiver while preserving text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mt-20 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Ethiopia's Premier Home Healthcare Network
            </div>

            {/* Headline - refined typography without gaudy gradients */}
            <div>
              <div className='w-3/4'>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.14] mb-12 mt-8">
                  Compassionate Care,{' '}
                  <span className="text-teal-400 font-bold block sm:inline">
                    In the Comfort of Home
                  </span>
                </h1>
              </div>
              <div className='w-1/4'>

              </div>
            </div>


            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 mt-8">
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" variant="primary" className="shadow-lg shadow-teal-950/50">
                  Request Care Assessment →
                </Button>
              </Link>
              <Link href="#about">
                <button className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-8 sm:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{s.value}</p>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceCarousel />

      {/* ABOUT - 3-column layout matching reference design */}
      <section id="about" className="py-16 bg-white overflow-hidden">
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

      {/* PORTALS RIBBON - sleek horizontal dark banner matching reference design */}
      <section id="portals" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Integrated Platform</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Built for Families, Clinicians & Operations</h2>
          </div>

          {/* Dark Ribbon Capsule Bar */}
          <div className="bg-[#072421] border border-teal-800/40 rounded-2xl lg:rounded-3xl shadow-xl shadow-teal-950/20 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-teal-800/30">
              {portalItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group p-6 lg:py-7 lg:px-6 flex items-start gap-4 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="p-2.5 rounded-xl bg-teal-900/40 border border-teal-700/30 text-teal-200 group-hover:text-white group-hover:border-teal-500/50 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm sm:text-base tracking-tight leading-snug group-hover:text-teal-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300/80 text-xs leading-relaxed mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 group-hover:text-teal-100 underline underline-offset-4 decoration-teal-400/40 group-hover:decoration-teal-200 transition-all">
                      <span>{item.cta}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative h-[400px]">
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
