'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/Button';
import { ROUTES } from '../../../lib/constants/routes';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">Astamami Care</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-sm text-slate-500 mt-1">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm">
              If an account exists with <strong>{email}</strong>, a password reset link has been sent to your email.
            </div>
            <Link href={ROUTES.LOGIN} className="block">
              <Button variant="outline" className="w-full">
                ← Return to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                href={ROUTES.LOGIN}
                className="text-xs text-slate-500 hover:text-teal-700"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
