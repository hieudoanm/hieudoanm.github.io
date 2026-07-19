'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import type { AppData } from '@/lib/downloads';
import { getHomeScreenshotUrl } from '@/lib/screenshots';
import type { ViewMode } from '@/lib/types';

interface RecentlyViewedProps {
  apps: AppData[];
  viewMode: ViewMode;
  isFavorite: (slug: string) => boolean;
  highlightQuery?: string;
}

export const RecentlyViewed: FC<RecentlyViewedProps> = ({
  apps,
  viewMode,
  isFavorite,
  highlightQuery = '',
}) => {
  if (apps.length === 0) return null;

  return (
    <div className="mb-8 w-full max-w-3xl">
      <p className="text-base-content/50 mb-3 font-mono text-[10px] tracking-widest uppercase">
        Recently Viewed
      </p>
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/app/${app.slug}/`}
              className="card bg-base-200 border-base-300 hover:bg-base-300 group block overflow-hidden border transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
              <div className="bg-base-100 aspect-video overflow-hidden">
                <img
                  src={getHomeScreenshotUrl(app.slug)}
                  alt={`${app.label} home screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="card-body flex-row items-center gap-2 p-3">
                <div className="min-w-0">
                  <div className="truncate text-xs font-normal tracking-tight">
                    {app.label}
                  </div>
                </div>
                <span
                  className={`text-primary ml-auto text-sm ${
                    isFavorite(app.slug) ? '' : 'opacity-40'
                  }`}
                  aria-hidden="true">
                  {isFavorite(app.slug) ? '\u2665' : '\u2661'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : viewMode === 'list' ? (
        <div className="flex flex-col gap-2">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/app/${app.slug}/`}
              className="card bg-base-200 border-base-300 hover:bg-base-300 flex flex-row items-center gap-3 border p-3 transition-colors">
              <span className="text-primary text-sm">
                {isFavorite(app.slug) ? '\u2665' : '\u2661'}
              </span>
              <span className="text-sm">{app.label}</span>
              <span className="text-base-content/40 ml-auto text-xs">
                {app.primaryCategory}
              </span>
            </Link>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

RecentlyViewed.displayName = 'RecentlyViewed';
