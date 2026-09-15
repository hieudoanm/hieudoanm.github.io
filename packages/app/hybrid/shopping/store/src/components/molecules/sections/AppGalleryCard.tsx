'use client';

import { Highlight } from '@/components/atoms/Highlight';
import type { AppData } from '@/lib/downloads';
import { getHomeScreenshotUrl } from '@/lib/screenshots';
import Link from 'next/link';
import type { FC } from 'react';

interface AppGalleryCardProps {
  app: AppData;
  isFavorite: (slug: string) => boolean;
  highlightQuery: string;
}

const Heart: FC<{ filled: boolean; favorited: boolean }> = ({
  filled,
  favorited,
}) => (
  <span
    className={`text-primary ml-auto text-sm ${favorited ? '' : 'opacity-40'}`}
    aria-hidden="true">
    {filled ? '\u2665' : '\u2661'}
  </span>
);

Heart.displayName = 'Heart';

export const AppGalleryCard: FC<AppGalleryCardProps> = ({
  app,
  isFavorite,
  highlightQuery,
}) => (
  <Link
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
      <Heart filled={isFavorite(app.slug)} favorited={isFavorite(app.slug)} />
    </div>
  </Link>
);

AppGalleryCard.displayName = 'AppGalleryCard';
