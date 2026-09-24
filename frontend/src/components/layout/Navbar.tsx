'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants/routes';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 tracking-tight block">
              Astamami
            </span>
            <span className="text-xs text-teal-700 font-semibold tracking-wider uppercase block">
              Care Alliance
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#services" className="hover:text-teal-700 transition-colors">
            Care Services
          </Link>
          <Link href="#how-it-works" className="hover:text-teal-700 transition-colors">
            How It Works
          </Link>
          <Link href="#about" className="hover:text-teal-700 transition-colors">
            Clinical Standards
          </Link>
          <Link href={ROUTES.ADMIN.DASHBOARD} className="hover:text-teal-700 text-xs uppercase px-2 py-1 bg-slate-100 rounded text-slate-700 font-semibold">
            Admin Portal
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href={ROUTES.LOGIN}>
            <Button variant="ghost" size="md">
              Sign In
            </Button>
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
