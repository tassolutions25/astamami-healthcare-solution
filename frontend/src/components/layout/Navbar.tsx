'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants/routes';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <div>
            <span className={`text-xl font-bold tracking-tight block transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Astamami
            </span>
            <span className={`text-xs font-semibold tracking-wider uppercase block transition-colors duration-300 ${scrolled ? 'text-teal-700' : 'text-teal-300'}`}>
              Care Alliance
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#services" className={`hover:text-teal-400 transition-colors duration-300 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
            Care Services
          </Link>
          <Link href="#how-it-works" className={`hover:text-teal-400 transition-colors duration-300 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
            How It Works
          </Link>
          <Link href="#about" className={`hover:text-teal-400 transition-colors duration-300 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
            Clinical Standards
          </Link>
          <Link
            href={ROUTES.ADMIN.DASHBOARD}
            className={`text-xs uppercase px-2 py-1 rounded font-semibold transition-all duration-300 ${scrolled ? 'bg-slate-100 text-slate-700 hover:text-teal-700' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            Admin Portal
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href={ROUTES.LOGIN}>
            <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}>
              Sign In
            </button>
          </Link>
          <Link href={ROUTES.REGISTER}>
            <Button variant="primary" size="md">
              Book Home Care
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
