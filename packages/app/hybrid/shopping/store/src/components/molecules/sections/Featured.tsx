'use client';

import { TaggedStoreCard } from '@/components/atoms/StoreCard';
import { getRecommendedDownload, type AppData } from '@/lib/downloads';
import type { Platform } from '@/lib/os';
import type { FC } from 'react';

interface FeaturedProps {
  apps: AppData[];
  platform: Platform;
}

export const Featured: FC<FeaturedProps> = ({ apps, platform }) => {
  if (apps.length === 0) return null;

  return (
    <section className="mb-10 w-full max-w-3xl">
      <div className="mb-4">
        <h2 className="text-lg font-light tracking-tight">Featured</h2>
        <p className="text-base-content/40 text-xs">
          Hand-picked apps you won&apos;t want to miss
        </p>
      </div>
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
    </section>
  );
};

Featured.displayName = 'Featured';
