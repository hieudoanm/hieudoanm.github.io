import { type FC, useMemo } from 'react';
import type { AppData, DownloadOption } from '@/lib/downloads';
import { detectPlatform, type Platform } from '@/lib/os';
import { AndroidGroup } from './AndroidGroup';
import { MacOSGroup } from './MacOSGroup';
import { LinuxGroup } from './LinuxGroup';
import { WindowsGroup } from './WindowsGroup';
import { PlatformGroup } from './PlatformGroup';

const PLATFORM_ORDER: Platform[] = [
  'android',
  'macos',
  'linux',
  'windows',
  'ios',
];

const PLATFORM_GROUPS: Record<
  string,
  FC<{ downloads: DownloadOption[]; recommended: DownloadOption | undefined }>
> = {
  android: AndroidGroup,
  macos: MacOSGroup,
  linux: LinuxGroup,
  windows: WindowsGroup,
};

interface DownloadSectionProps {
  app: AppData;
}

export const DownloadSection: FC<DownloadSectionProps> = ({ app }) => {
  const currentPlatform = detectPlatform();
  const recommended = app.downloads.find((d) => d.platform === currentPlatform);

  const groups = useMemo(() => {
    const grouped: Record<string, DownloadOption[]> = {};
    for (const dl of app.downloads) {
      const key = dl.platform;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(dl);
    }

    return Object.entries(grouped).sort(([a], [b]) => {
      const aIsCurrent = a === currentPlatform ? -1 : 0;
      const bIsCurrent = b === currentPlatform ? -1 : 0;
      if (aIsCurrent !== bIsCurrent) return aIsCurrent - bIsCurrent;
      const ai = PLATFORM_ORDER.indexOf(a as Platform);
      const bi = PLATFORM_ORDER.indexOf(b as Platform);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [app.downloads, currentPlatform]);

  return (
    <div className="space-y-6">
      <h2 className="text-base-content/70 font-mono text-xs tracking-widest uppercase">
        Download Options
      </h2>
      {groups.map(([plat, downloads]) => {
        const Group = PLATFORM_GROUPS[plat] ?? PlatformGroup;
        return (
          <Group key={plat} downloads={downloads} recommended={recommended} />
        );
      })}
    </div>
  );
};

DownloadSection.displayName = 'DownloadSection';
