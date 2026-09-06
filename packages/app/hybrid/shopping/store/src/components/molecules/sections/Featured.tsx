'use client';

import { Highlight } from '@/components/atoms/Highlight';
import { TaggedStoreCard } from '@/components/atoms/StoreCard';
import { getRecommendedDownload, type AppData } from '@/lib/downloads';
import type { Platform } from '@/lib/os';
import { getHomeScreenshotUrl } from '@/lib/screenshots';
import type { ViewMode } from '@/lib/types';
import Link from 'next/link';
import type { FC } from 'react';

interface FeaturedProps {
  apps: AppData[];
  platform: Platform;
  viewMode: ViewMode;
  isFavorite: (slug: string) => boolean;
  highlightQuery?: string;
}

export const Featured: FC<FeaturedProps> = ({
  apps,
  platform,
  viewMode,
  isFavorite,
  highlightQuery = '',
}) => {
  if (apps.length === 0) return null;

  return (
    <section className="mb-10 w-full max-w-3xl">
      <div className="mb-4">
        <h2 className="text-lg font-light tracking-tight">Featured</h2>
        <p className="text-base-content/40 text-xs">
          Hand-picked apps you won&apos;t want to miss
        </p>
      </div>
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="truncate text-sm font-normal tracking-tight">
                    <Highlight text={app.label} query={highlightQuery} />
                  </div>
                  <div className="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
                    {app.primaryCategory}
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
              <span className="text-sm">
                <Highlight text={app.label} query={highlightQuery} />
              </span>
              <span className="text-base-content/40 ml-auto text-xs">
                {app.primaryCategory}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {apps.map((app) => (
            <TaggedStoreCard
              key={app.slug}
              app={app}
              platform={platform}
              recommended={getRecommendedDownload(app, platform)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

Featured.displayName = 'Featured';
