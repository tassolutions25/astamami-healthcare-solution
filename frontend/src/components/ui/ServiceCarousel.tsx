'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const services = [
  {
    title: 'Elderly & Dementia Care',
    badge: 'Popular',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Elderly person with cane */}
        <circle cx="60" cy="30" r="16" fill="#94a3b8" />
        <rect x="52" y="46" width="16" height="38" rx="8" fill="#94a3b8" />
        <rect x="48" y="70" width="10" height="28" rx="5" fill="#94a3b8" />
        <rect x="62" y="70" width="10" height="28" rx="5" fill="#94a3b8" />
        {/* cane */}
        <rect x="74" y="58" width="4" height="40" rx="2" fill="#64748b" />
        <rect x="70" y="56" width="12" height="4" rx="2" fill="#64748b" />
        {/* heart */}
        <path d="M55 24 Q60 18 65 24 Q70 29 60 36 Q50 29 55 24Z" fill="#f87171" />
      </svg>
    ),
  },
  {
    title: 'Post-Operative Recovery',
    badge: 'Clinical',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* IV bag */}
        <rect x="42" y="10" width="36" height="44" rx="6" fill="#94a3b8" />
        <rect x="55" y="54" width="10" height="30" rx="3" fill="#64748b" />
        <rect x="46" y="80" width="28" height="22" rx="5" fill="#94a3b8" />
        {/* cross */}
        <rect x="56" y="22" width="8" height="20" rx="2" fill="white" />
        <rect x="50" y="28" width="20" height="8" rx="2" fill="white" />
        {/* drop */}
        <ellipse cx="60" cy="58" rx="4" ry="6" fill="#7dd3fc" />
      </svg>
    ),
  },
  {
    title: 'Chronic Disease Management',
    badge: 'Specialized',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* heart monitor / ECG */}
        <rect x="15" y="30" width="90" height="60" rx="10" fill="#94a3b8" />
        <rect x="20" y="35" width="80" height="50" rx="8" fill="#1e293b" />
        {/* ECG line */}
        <polyline points="22,60 35,60 42,40 48,78 55,50 62,60 68,60 78,40 85,60 98,60"
          stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* dots on screen */}
        <circle cx="30" cy="73" r="2" fill="#34d399" />
        <text x="34" y="76" fontSize="8" fill="#34d399" fontFamily="monospace">98 BPM</text>
      </svg>
    ),
  },
  {
    title: 'Maternal & Newborn Care',
    badge: 'Family',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* mother */}
        <circle cx="50" cy="22" r="14" fill="#94a3b8" />
        <path d="M30 50 Q50 38 70 50 L68 95 H32 Z" fill="#94a3b8" />
        {/* baby wrapped */}
        <ellipse cx="72" cy="62" rx="16" ry="20" fill="#cbd5e1" />
        <circle cx="72" cy="46" r="10" fill="#e2e8f0" />
        {/* heart */}
        <path d="M45 20 Q50 15 55 20 Q60 25 50 31 Q40 25 45 20Z" fill="#f87171" />
      </svg>
    ),
  },
  {
    title: 'Palliative & Comfort Care',
    badge: 'Compassionate',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* hands holding */}
        <path d="M20 70 Q20 50 35 50 L55 50 Q65 50 65 60 L65 90 Q65 100 55 100 L35 100 Q20 100 20 85 Z" fill="#94a3b8" />
        <path d="M100 70 Q100 50 85 50 L65 50 Q55 50 55 60 L55 90 Q55 100 65 100 L85 100 Q100 100 100 85 Z" fill="#cbd5e1" />
        {/* heart above */}
        <path d="M48 36 Q60 24 72 36 Q84 48 60 62 Q36 48 48 36Z" fill="#f87171" />
      </svg>
    ),
  },
  {
    title: 'Physiotherapy & Rehab',
    badge: 'Recovery',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* person stretching */}
        <circle cx="60" cy="18" r="13" fill="#94a3b8" />
        {/* body */}
        <rect x="52" y="32" width="16" height="32" rx="8" fill="#94a3b8" />
        {/* arms raised */}
        <rect x="20" y="28" width="34" height="10" rx="5" fill="#94a3b8" transform="rotate(-20 20 28)" />
        <rect x="66" y="28" width="34" height="10" rx="5" fill="#94a3b8" transform="rotate(20 66 28)" />
        {/* legs */}
        <rect x="48" y="62" width="10" height="30" rx="5" fill="#94a3b8" transform="rotate(-10 48 62)" />
        <rect x="62" y="62" width="10" height="30" rx="5" fill="#94a3b8" transform="rotate(10 62 62)" />
        {/* dumbbell */}
        <rect x="25" y="82" width="40" height="6" rx="3" fill="#64748b" />
        <rect x="20" y="76" width="10" height="18" rx="4" fill="#64748b" />
        <rect x="60" y="76" width="10" height="18" rx="4" fill="#64748b" />
      </svg>
    ),
  },
  {
    title: 'Wound Care & Dressing',
    badge: 'Clinical',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* medical kit */}
        <rect x="20" y="35" width="80" height="60" rx="10" fill="#94a3b8" />
        <rect x="42" y="25" width="36" height="20" rx="6" fill="#64748b" />
        {/* cross */}
        <rect x="52" y="52" width="16" height="40" rx="4" fill="white" />
        <rect x="40" y="64" width="40" height="16" rx="4" fill="white" />
        {/* bandage strip */}
        <rect x="28" y="88" width="24" height="8" rx="4" fill="#fde68a" />
        <rect x="32" y="86" width="4" height="12" rx="2" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    title: 'Mental Health Support',
    badge: 'Wellness',
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* brain */}
        <ellipse cx="60" cy="45" rx="34" ry="30" fill="#94a3b8" />
        <path d="M60 15 Q80 15 88 32 Q96 48 88 62 Q80 75 60 75 Q40 75 32 62 Q24 48 32 32 Q40 15 60 15Z"
          fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        {/* brain folds */}
        <path d="M60 20 Q70 30 60 40 Q50 50 60 60" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M44 30 Q50 38 44 48" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M76 30 Q70 38 76 48" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* glow/sparkles */}
        <circle cx="88" cy="30" r="5" fill="#fbbf24" />
        <circle cx="92" cy="50" r="3" fill="#34d399" />
        <circle cx="28" cy="50" r="4" fill="#60a5fa" />
        {/* stem */}
        <rect x="56" y="74" width="8" height="22" rx="4" fill="#94a3b8" />
        <ellipse cx="60" cy="98" rx="16" ry="5" fill="#94a3b8" />
      </svg>
    ),
  },
];

const VISIBLE = 5; // 5 items visible at once on desktop (matches 5-column grid)

export const ServiceCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = services.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = () => {
    setCurrent((c) => (c - 1 + total) % total);
  };

  // Auto-advance every 3 seconds
  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
      resetTimer();
    }
    touchStartX.current = null;
  };

  // Build the visible window (circular)
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < VISIBLE; i++) {
      items.push(services[(current + i) % total]);
    }
    return items;
  };

  const handleNav = (dir: 'prev' | 'next') => {
    if (dir === 'prev') prev();
    else next();
    resetTimer();
  };

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">
            Comprehensive Care Programs
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Tailored to Your Loved One's Exact Needs
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative flex items-center">
          {/* Left arrow */}
          <button
            onClick={() => handleNav('prev')}
            className="flex-shrink-0 w-11 h-11 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center text-slate-500 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 z-10 mr-4"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Items */}
          <div
            className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-6"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {getVisible().map((s, i) => {
              const globalIdx = (current + i) % total;
              const isHovered = hoveredIdx === globalIdx;
              return (
                <div
                  key={`${s.title}-${i}`}
                  className={`${i === 4 ? 'hidden md:flex' : 'flex'} flex-col items-center cursor-pointer select-none transition-transform duration-300 ease-out ${isHovered ? '-translate-y-3' : 'translate-y-0'
                    }`}
                  onMouseEnter={() => setHoveredIdx(globalIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Container: height 220px ensures illustration can stick 2/3 outside circle without clipping */}
                  {/* Circle h=144px (w-36), Image h=96px (w-24) */}
                  {/* Before Hover (default): exactly half inside & half outside (48px inside / 48px outside) -> bottom = 144 - 48 = 96px */}
                  {/* On Hover: exactly 1/3 inside & 2/3 outside (32px inside / 64px outside) -> bottom = 144 - 32 = 112px (shifts up) */}
                  <div className="relative w-44 mb-4" style={{ height: '220px' }}>
                    {/* Circle — fixed at bottom center (height: 144px) */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full transition-colors duration-300 shadow-inner ${isHovered ? 'bg-teal-600' : 'bg-slate-100'
                        }`}
                    />
                    {/* SVG illustration (height: 96px) — half-inside/half-outside before hover, 1/3-inside/2/3-outside on hover */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-24 h-24 transition-all duration-300 ease-out ${isHovered ? 'drop-shadow-xl' : 'drop-shadow-md'
                        }`}
                      style={{
                        bottom: isHovered ? '112px' : '96px',
                      }}
                    >
                      {s.svg}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-center font-bold text-sm leading-snug transition-colors duration-300 ${isHovered ? 'text-teal-700' : 'text-slate-800'
                      }`}
                  >
                    {s.title}
                  </h3>

                  {/* Badge */}
                  <span
                    className={`mt-2 text-xs font-semibold px-3 py-0.5 rounded-full border transition-all duration-300 ${isHovered
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-teal-50 text-teal-700 border-teal-100'
                      }`}
                  >
                    {s.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => handleNav('next')}
            className="flex-shrink-0 w-11 h-11 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center text-slate-500 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 z-10 ml-4"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetTimer(); }}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-6 h-2.5 bg-teal-600'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
