'use client';

import { TaggedStoreCard } from '@/components/atoms/StoreCard';
import { detectBrowser, recommendDownload } from '@/lib/browser';
import type { AppData } from '@/lib/downloads';
import type { Platform } from '@/lib/os';
import { SECTION_META, type ViewMode } from '@/lib/types';
import type { FC } from 'react';
import { AppGalleryCard } from './sections/AppGalleryCard';
import { AppListRow } from './sections/AppListRow';
import { AppSectionHeader } from './sections/AppSectionHeader';

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
      <AppSectionHeader
        label={meta.label}
        description={meta.description}
        count={apps.length}
      />
      <AppSectionViews
        apps={apps}
        platform={platform}
        viewMode={viewMode}
        isFavorite={isFavorite}
        browser={browser}
        highlightQuery={highlightQuery}
      />
    </section>
  );
};

interface AppSectionViewsProps {
  apps: AppData[];
  platform: Platform;
  viewMode: ViewMode;
  isFavorite: (slug: string) => boolean;
  browser: ReturnType<typeof detectBrowser>['browser'];
  highlightQuery: string;
}

const AppSectionViews: FC<AppSectionViewsProps> = ({
  apps,
  platform,
  viewMode,
  isFavorite,
  browser,
  highlightQuery,
}) => {
  if (viewMode === 'gallery') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppGalleryCard
            key={app.slug}
            app={app}
            isFavorite={isFavorite}
            highlightQuery={highlightQuery}
          />
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-2">
        {apps.map((app) => (
          <AppListRow
            key={app.slug}
            app={app}
            isFavorite={isFavorite}
            highlightQuery={highlightQuery}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {apps.map((app) => (
        <TaggedStoreCard
          key={app.slug}
          app={app}
          platform={platform}
          recommended={recommendDownload(app, platform, browser)}
          highlight={highlightQuery}
        />
      ))}
    </div>
  );
};

AppSectionViews.displayName = 'AppSectionViews';
AppSection.displayName = 'AppSection';
