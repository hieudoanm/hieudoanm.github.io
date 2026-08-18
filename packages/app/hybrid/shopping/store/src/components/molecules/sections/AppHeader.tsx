'use client';

import type { FC } from 'react';
import { getIcon } from '@/lib/icons';
import type { AppData } from '@/lib/downloads';
import { PLATFORM_LABELS } from '@/lib/os';
import { PiShareFat } from 'react-icons/pi';

interface AppHeaderProps {
  app: AppData;
}

const handleShare = (app: AppData) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/app/${app.slug}/`;
  if (navigator.share) {
    navigator.share({ title: app.label, text: app.primaryCategory, url });
  } else {
    navigator.clipboard.writeText(url);
  }
};

export const AppHeader: FC<AppHeaderProps> = ({ app }) => {
  const Icon = getIcon(app.icon);
  return (
    <div className="mb-8 text-center">
      <div className="bg-primary/20 border-primary/30 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full shadow-inner">
        <Icon className="text-primary text-4xl" />
      </div>
      <h1 className="mb-2 text-3xl font-thin tracking-tight">{app.label}</h1>
      <p className="text-base-content/50 text-sm">{app.primaryCategory}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="bg-primary/20 text-primary border-primary/30 badge badge-sm font-mono tracking-normal">
          {app.section}
        </span>
        <span className="bg-base-300 text-base-content/60 badge badge-sm font-mono tracking-normal">
          v{app.version}
        </span>
        {app.lastUpdated && (
          <span className="bg-base-300 text-base-content/60 badge badge-sm font-mono tracking-normal">
            {app.lastUpdated}
          </span>
        )}
        {app.fileSize && (
          <span className="bg-base-300 text-base-content/60 badge badge-sm font-mono tracking-normal">
            {app.fileSize}
          </span>
        )}
        {app.platforms.map((p) => (
          <span
            key={p}
            className="bg-base-300 text-base-content/60 badge badge-sm font-mono tracking-normal">
            {PLATFORM_LABELS[p]}
          </span>
        ))}
        <button
          type="button"
          onClick={() => handleShare(app)}
          className="btn btn-ghost btn-xs"
          title="Share">
          <PiShareFat className="text-sm" />
        </button>
      </div>
    </div>
  );
};
AppHeader.displayName = 'AppHeader';
