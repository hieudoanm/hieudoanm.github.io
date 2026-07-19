import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { detectPlatform, PLATFORM_LABELS, type Platform } from '@/lib/os';
import { DownloadRow } from '../DownloadRow';

const extractExtensions = (downloads: DownloadOption[]): string[] => {
  const exts = new Set<string>();
  for (const dl of downloads) {
    const match = dl.url.match(/\.([a-z0-9]+)$/i);
    if (match) exts.add(`.${match[1].toLowerCase()}`);
  }
  return [...exts].sort();
};

interface PlatformGroupProps {
  platform: Platform;
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const PlatformGroup: FC<PlatformGroupProps> = ({
  platform,
  downloads,
  recommended,
}) => {
  const currentPlatform = detectPlatform();
  const isCurrentGroup = platform === currentPlatform;
  const exts = extractExtensions(downloads);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3
          className={`font-mono text-xs tracking-widest uppercase ${
            isCurrentGroup ? 'text-primary' : 'text-base-content/50'
          }`}>
          {PLATFORM_LABELS[platform] ?? platform}
          {exts.length > 0 && (
            <span className="ml-1 font-normal normal-case">
              ({exts.join(', ')})
            </span>
          )}
        </h3>
        {isCurrentGroup && (
          <span className="bg-primary/20 text-primary badge badge-xs font-mono">
            Current
          </span>
        )}
      </div>
      <div className="space-y-2">
        {downloads.map((dl) => (
          <DownloadRow
            key={dl.url}
            download={dl}
            isRecommended={dl === recommended}
          />
        ))}
      </div>
    </div>
  );
};
PlatformGroup.displayName = 'PlatformGroup';
