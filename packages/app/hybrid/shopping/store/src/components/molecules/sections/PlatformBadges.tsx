import type { FC } from 'react';
import type { AppData } from '@/lib/downloads';
import { detectPlatform, PLATFORM_LABELS, type Platform } from '@/lib/os';

interface PlatformBadgesProps {
  app: AppData;
}

export const PlatformBadges: FC<PlatformBadgesProps> = ({ app }) => {
  const platform = detectPlatform();
  return (
    <div className="border-base-300 mt-8 border-t pt-6">
      <h2 className="text-base-content/70 mb-3 font-mono text-xs tracking-widest uppercase">
        All Platforms
      </h2>
      <div className="flex flex-wrap gap-2">
        {app.platforms.map((p) => (
          <span
            key={p}
            className={`badge badge-sm ${
              p === platform
                ? 'badge-primary'
                : 'bg-base-300 text-base-content/60'
            }`}>
            {PLATFORM_LABELS[p]}
            {p === platform && ' (current)'}
          </span>
        ))}
      </div>
    </div>
  );
};
PlatformBadges.displayName = 'PlatformBadges';
