'use client';

import { Highlight } from '@/components/atoms/Highlight';
import { TaggedStoreCard } from '@/components/atoms/StoreCard';
import { detectBrowser, recommendExtension } from '@/lib/browser';
import { getRecommendedDownload, type AppData } from '@/lib/downloads';
import type { Platform } from '@/lib/os';
import { SECTION_META, type ViewMode } from '@/lib/types';
import Link from 'next/link';
import { type FC } from 'react';

interface AppSectionProps {
  sectionKey: string;
  apps: AppData[];
  platform: Platform;
  viewMode: ViewMode;
  isFavorite: (slug: string) => boolean;
  highlightQuery?: string;
}

export const AppSection: FC<AppSectionProps> = ({
  sectionKey,
  apps,
  platform,
  viewMode,
  isFavorite,
  highlightQuery = '',
}) => {
  const meta = SECTION_META[sectionKey] ?? {
    label: sectionKey,
    description: '',
  };

  const browser = detectBrowser().browser;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-light tracking-tight">{meta.label}</h2>
        <p className="text-base-content/40 text-xs">{meta.description}</p>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map((app) => (
            <TaggedStoreCard
              key={app.slug}
              app={app}
              platform={platform}
              recommended={
                app.section === 'extension'
                  ? recommendExtension(app.downloads, browser)
                  : getRecommendedDownload(app, platform)
              }
              highlight={highlightQuery}
            />
          ))}
        </div>
      ) : (
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
      )}
    </section>
  );
};

AppSection.displayName = 'AppSection';
