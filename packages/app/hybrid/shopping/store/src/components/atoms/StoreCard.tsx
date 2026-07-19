'use client';

import { Highlight } from './Highlight';
import type { AppData, DownloadOption } from '@/lib/downloads';
import { useFavorites } from '@/lib/hooks';
import { getIcon } from '@/lib/icons';
import { type Platform } from '@/lib/os';
import Link from 'next/link';
import type { FC } from 'react';
import { WebTag } from './WebTag';

interface StoreCardProps {
  app: AppData;
  platform: Platform;
  recommended?: DownloadOption;
  highlight?: string;
}

export const StoreCard: FC<StoreCardProps> = ({
  app,
  platform,
  recommended,
  highlight = '',
}) => {
  const Icon = getIcon(app.icon);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="card bg-base-200 border-base-300 hover:bg-base-300 group relative w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
      <button
        type="button"
        onClick={() => toggleFavorite(app.slug)}
        className="btn btn-ghost btn-xs absolute top-2 right-2 z-10"
        data-testid="favorite-toggle">
        {isFavorite(app.slug) ? (
          <span className="text-primary text-sm">&#9829;</span>
        ) : (
          <span className="text-base-content/30 text-sm">&#9825;</span>
        )}
      </button>
      <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full shadow-inner transition-transform duration-300 group-hover:scale-110">
          <Icon className="text-primary text-xl" />
        </div>
        <div className="w-full text-center">
          <div className="truncate text-sm font-normal tracking-tight">
            <Highlight text={app.label} query={highlight} />
          </div>
          <div className="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
            {app.primaryCategory}
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          {recommended && (
            <button
              type="button"
              onClick={() =>
                window.open(recommended.url, '_blank', 'noopener,noreferrer')
              }
              className="btn btn-primary btn-xs w-full">
              {recommended.label}
            </button>
          )}
          <Link
            href={`/app/${app.slug}/`}
            className="btn btn-ghost btn-xs w-full no-underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

StoreCard.displayName = 'StoreCard';

export const TaggedStoreCard = WebTag('store-card', StoreCard);
