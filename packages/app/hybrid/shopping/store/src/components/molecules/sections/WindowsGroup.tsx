import type { FC } from 'react';
import type { DownloadOption } from '@/lib/downloads';
import { PlatformGroup } from './PlatformGroup';

interface WindowsGroupProps {
  downloads: DownloadOption[];
  recommended: DownloadOption | undefined;
}

export const WindowsGroup: FC<WindowsGroupProps> = ({
  downloads,
  recommended,
}) => (
  <PlatformGroup
    platform="windows"
    downloads={downloads}
    recommended={recommended}
  />
);
WindowsGroup.displayName = 'WindowsGroup';
