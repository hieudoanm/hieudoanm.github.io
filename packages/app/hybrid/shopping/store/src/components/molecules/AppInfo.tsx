'use client';

import type { FC } from 'react';
import type { AppData } from '@/lib/downloads';
import { AppHeader } from './sections/AppHeader';
import { DownloadSection } from './sections/DownloadSection';
import { BackLink } from './sections/BackLink';

interface AppInfoProps {
  app: AppData;
}

export const AppInfo: FC<AppInfoProps> = ({ app }) => (
  <div className="mx-auto max-w-2xl p-6">
    <AppHeader app={app} />
    <DownloadSection app={app} />
    <BackLink />
  </div>
);

AppInfo.displayName = 'AppInfo';
