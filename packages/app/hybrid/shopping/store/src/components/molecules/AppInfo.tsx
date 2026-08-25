'use client';

import type { FC } from 'react';
import type { AppData } from '@/lib/downloads';
import { AppHeader } from './sections/AppHeader';
import { DownloadSection } from './sections/DownloadSection';
import { ScreenshotCarousel } from './sections/ScreenshotCarousel';
import { RelatedApps } from './sections/RelatedApps';
import { BackLink } from './sections/BackLink';

interface AppInfoProps {
  app: AppData;
  allApps?: AppData[];
}

export const AppInfo: FC<AppInfoProps> = ({ app, allApps }) => (
  <div className="mx-auto max-w-2xl p-6">
    <AppHeader app={app} />
    <ScreenshotCarousel screenshots={app.screenshots} label={app.label} />
    <DownloadSection app={app} />
    {allApps && <RelatedApps app={app} allApps={allApps} />}
    <BackLink />
  </div>
);

AppInfo.displayName = 'AppInfo';
