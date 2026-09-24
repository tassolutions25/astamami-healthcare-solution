'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/Button';
import { apiClient } from '../../../lib/api/client';
import { ROUTES } from '../../../lib/constants/routes';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'CLIENT' | 'CAREGIVER'>('CLIENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res: any = await apiClient.post('/auth/register', {
        fullName,
        email,
        phone,
        password,
        role,
      });

      if (res?.tokens?.accessToken) {
        localStorage.setItem('astamami_token', res.tokens.accessToken);
        localStorage.setItem('astamami_user', JSON.stringify(res.user));

        if (role === 'CAREGIVER') {
          router.push(ROUTES.CAREGIVER.DASHBOARD);
        } else {
          router.push(ROUTES.CLIENT.DASHBOARD);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
          <p className="text-sm text-slate-500 mt-1">
            Join Ethiopia’s compassionate home care network
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole('CLIENT')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'CLIENT'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            I Need Care / Family
          </button>
          <button
            type="button"
            onClick={() => setRole('CAREGIVER')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'CAREGIVER'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            I am a Nurse / Caregiver
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Abebe Bekele"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+251 9XX XXX XXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password (Min 8 characters)
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            Create {role === 'CLIENT' ? 'Client' : 'Caregiver'} Account
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href={ROUTES.LOGIN} className="text-teal-700 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
