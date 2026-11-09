import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { PlatformGroup } from './PlatformGroup';

interface MacOSGroupProps {
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const MacOSGroup: FC<MacOSGroupProps> = ({ downloads, recommended }) => (
  <PlatformGroup
    platform="macos"
    downloads={downloads}
    recommended={recommended}
  />
);
MacOSGroup.displayName = 'MacOSGroup';
