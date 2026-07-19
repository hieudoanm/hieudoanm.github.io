import { type FC, useMemo } from 'react';
import type { AppData, DownloadOption } from '@/lib/downloads';
import { getDownloadFormat } from '@/lib/downloads';
import { detectPlatform, type Platform } from '@/lib/os';
import { detectBrowser, recommendExtension } from '@/lib/browser';
import { AndroidGroup } from './AndroidGroup';
import { MacOSGroup } from './MacOSGroup';
import { LinuxGroup } from './LinuxGroup';
import { WindowsGroup } from './WindowsGroup';
import { PlatformGroup } from './PlatformGroup';
import { ExtensionGroup } from './ExtensionGroup';

const PLATFORM_ORDER: Platform[] = [
  'android',
  'macos',
  'linux',
  'windows',
  'ios',
];

const FORMAT_ORDER = ['crx', 'xpi', 'zip'];

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
  const browser = detectBrowser().browser;
  const isExtension = app.section === 'extension';
  const recommended = isExtension
    ? recommendExtension(app.downloads, browser)
    : app.downloads.find((d) => d.platform === currentPlatform);

  const groups = useMemo(() => {
    const grouped: Record<string, DownloadOption[]> = {};
    for (const dl of app.downloads) {
      const key = isExtension ? getDownloadFormat(dl) : dl.platform;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(dl);
    }

    return Object.entries(grouped).sort(([a], [b]) => {
      if (isExtension) {
        const ai = FORMAT_ORDER.indexOf(a);
        const bi = FORMAT_ORDER.indexOf(b);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      }
      const aIsCurrent = a === currentPlatform ? -1 : 0;
      const bIsCurrent = b === currentPlatform ? -1 : 0;
      if (aIsCurrent !== bIsCurrent) return aIsCurrent - bIsCurrent;
      const ai = PLATFORM_ORDER.indexOf(a as Platform);
      const bi = PLATFORM_ORDER.indexOf(b as Platform);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [app.downloads, currentPlatform, isExtension]);

  return (
    <div className="space-y-6">
      <h2 className="text-base-content/70 font-mono text-xs tracking-widest uppercase">
        Download Options
      </h2>
      {groups.map(([key, downloads]) => {
        if (isExtension) {
          return (
            <ExtensionGroup
              key={key}
              format={key}
              downloads={downloads}
              recommended={recommended}
            />
          );
        }
        const Group = PLATFORM_GROUPS[key] ?? PlatformGroup;
        return (
          <Group key={key} downloads={downloads} recommended={recommended} />
        );
      })}
    </div>
  );
};

DownloadSection.displayName = 'DownloadSection';
