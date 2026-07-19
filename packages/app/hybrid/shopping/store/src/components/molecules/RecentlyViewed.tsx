'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import type { AppData } from '@/lib/downloads';

interface RecentlyViewedProps {
  apps: AppData[];
}

export const RecentlyViewed: FC<RecentlyViewedProps> = ({ apps }) => {
  if (apps.length === 0) return null;

  return (
    <div className="mb-8 w-full max-w-3xl">
      <p className="text-base-content/50 mb-3 font-mono text-[10px] tracking-widest uppercase">
        Recently Viewed
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {apps.map((app) => {
          const Icon = getIcon(app.icon);
          return (
            <Link
              key={app.slug}
              href={`/app/${app.slug}/`}
              className="card bg-base-200 border-base-300 hover:bg-base-300 border p-3 text-center transition-colors">
              <Icon className="text-primary mx-auto mb-1 text-lg" />
              <div className="truncate text-xs">{app.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

RecentlyViewed.displayName = 'RecentlyViewed';
