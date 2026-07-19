'use client';

import { APPS, AppKey } from '@/data/constants';
import { FC } from 'react';

interface ClockAppProps {
  activeApp: AppKey;
  onNavigate: (app: AppKey) => void;
  children: React.ReactNode;
}

export const ClockApp: FC<ClockAppProps> = ({
  activeApp,
  onNavigate,
  children,
}) => {
  return (
    <div className="bg-base-100 text-base-content flex h-screen w-screen flex-col overflow-hidden">
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {children}
      </main>

      <footer className="border-base-300 flex shrink-0 justify-center gap-2 border-t px-4 py-3">
        {APPS.map((app) => (
          <button
            key={app.key}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 transition-all ${
              activeApp === app.key
                ? 'bg-primary/10 text-primary'
                : 'text-base-content/40 hover:bg-base-200 hover:text-base-content/70'
            }`}
            onClick={() => onNavigate(app.key)}>
            <app.Icon className="h-6 w-6" />
            <span className="font-mono text-[10px] tracking-wider uppercase">
              {app.label}
            </span>
          </button>
        ))}
      </footer>
    </div>
  );
};

ClockApp.displayName = 'ClockApp';
