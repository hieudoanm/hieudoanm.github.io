import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { PlatformGroup } from './PlatformGroup';

interface AndroidGroupProps {
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const AndroidGroup: FC<AndroidGroupProps> = ({
  downloads,
  recommended,
}) => (
  <PlatformGroup
    platform="android"
    downloads={downloads}
    recommended={recommended}
  />
);
AndroidGroup.displayName = 'AndroidGroup';
