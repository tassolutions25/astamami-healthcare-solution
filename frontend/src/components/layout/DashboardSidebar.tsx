'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils/cn';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface DashboardSidebarProps {
  portalTitle: string;
  items: NavItem[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  portalTitle,
  items,
}) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div>
            <span className="text-white font-bold block text-sm">Astamami</span>
            <span className="text-teal-400 text-xs uppercase font-semibold">
              {portalTitle}
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-teal-700 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-teal-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>← Back to Website</span>
        </Link>
      </div>
    </aside>
  );
};
