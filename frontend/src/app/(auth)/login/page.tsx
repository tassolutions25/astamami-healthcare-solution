'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { apiClient } from '../../../lib/api/client';
import { ROUTES } from '../../../lib/constants/routes';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res: any = await apiClient.post('/auth/login', { email, password });
      if (res?.tokens?.accessToken) {
        localStorage.setItem('astamami_token', res.tokens.accessToken);
        localStorage.setItem('astamami_user', JSON.stringify(res.user));

        const roles: string[] = res.user?.roles || [];
        if (roles.includes('SUPER_ADMIN') || roles.includes('ADMIN')) {
          router.push(ROUTES.ADMIN.DASHBOARD);
        } else if (roles.includes('CAREGIVER')) {
          router.push(ROUTES.CAREGIVER.DASHBOARD);
        } else {
          router.push(ROUTES.CLIENT.DASHBOARD);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoAccount = (role: 'admin' | 'client' | 'caregiver') => {
    if (role === 'admin') {
      setEmail('admin@astamami.com');
      setPassword('Admin@123456');
    } else if (role === 'client') {
      setEmail('client@astamami.com');
      setPassword('Client@123456');
    } else {
      setEmail('caregiver@astamami.com');
      setPassword('Caregiver@123456');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">Astamami Care</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to Portal</h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your patient care plan, shifts, or coordinator console
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

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
              placeholder="name@astamami.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-xs text-teal-700 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>

        {/* Demo Fast Fill */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium text-center mb-2">
            Local Dev Quick-Fill:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDemoAccount('admin')}
              className="flex-1 text-xs py-1.5 px-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount('client')}
              className="flex-1 text-xs py-1.5 px-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setDemoAccount('caregiver')}
              className="flex-1 text-xs py-1.5 px-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
            >
              Caregiver
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Need an account?{' '}
          <Link href={ROUTES.REGISTER} className="text-teal-700 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
