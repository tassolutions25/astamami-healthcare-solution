import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pb-8 pt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-lg font-bold text-white">Astamami Care</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ethiopia’s leading home healthcare and specialized caregiver coordination platform. Providing dignified, clinically supervised in-home care.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Care Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>Elderly & Assisted Living</li>
              <li>Post-Surgical Recovery</li>
              <li>Chronic Illness Care</li>
              <li>Maternal & Newborn Support</li>
              <li>Physical Therapy & Rehab</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Client & Family Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Caregiver & Nurse Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Care Coordinator Console
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Contact & Support</h4>
            <p className="text-sm text-slate-400 mb-2">
              Addis Ababa, Ethiopia
            </p>
            <p className="text-sm text-slate-400 mb-2">
              Phone: +251 911 00 00 00
            </p>
            <p className="text-sm text-slate-400">
              Email: care@astamami.com
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-center text-slate-500">
          © {new Date().getFullYear()} Astamami Care Alliance. All rights reserved. Running in Local Development Mode.
        </div>
      </div>
    </footer>
  );
};
