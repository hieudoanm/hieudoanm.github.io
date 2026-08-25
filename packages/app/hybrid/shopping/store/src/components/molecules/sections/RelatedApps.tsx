'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import type { AppData } from '@/lib/downloads';

interface RelatedAppsProps {
  app: AppData;
  allApps: AppData[];
}

export const RelatedApps: FC<RelatedAppsProps> = ({ app, allApps }) => {
  const related = allApps
    .filter(
      (a) =>
        a.slug !== app.slug &&
        (a.description === app.description || a.section === app.section)
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="border-base-300 mt-6 border-t pt-6">
      <h2 className="text-base-content/70 mb-3 font-mono text-xs tracking-widest uppercase">
        Related Apps
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {related.map((r) => {
          const Icon = getIcon(r.icon);
          return (
            <Link
              key={r.slug}
              href={`/app/${r.slug}/`}
              className="card bg-base-200 border-base-300 hover:bg-base-300 border p-3 text-center transition-colors">
              <Icon className="text-primary mx-auto mb-1 text-lg" />
              <div className="truncate text-xs">{r.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
RelatedApps.displayName = 'RelatedApps';
