import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { PlatformGroup } from './PlatformGroup';

interface LinuxGroupProps {
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const LinuxGroup: FC<LinuxGroupProps> = ({ downloads, recommended }) => (
  <PlatformGroup
    platform="linux"
    downloads={downloads}
    recommended={recommended}
  />
);
LinuxGroup.displayName = 'LinuxGroup';
