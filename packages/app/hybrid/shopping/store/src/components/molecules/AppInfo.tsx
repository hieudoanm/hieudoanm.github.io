'use client';

import { getAppScreenshots } from '@/lib/screenshots';
import type { AppData } from '@/lib/downloads';
import type { FC } from 'react';
import { AppHeader } from './sections/AppHeader';
import { DownloadSection } from './sections/DownloadSection';
import { ScreenshotCarousel } from './sections/ScreenshotCarousel';
import { SystemRequirements } from './sections/SystemRequirements';
import { RelatedApps } from './sections/RelatedApps';
import { BackLink } from './sections/BackLink';

interface AppInfoProps {
  app: AppData;
  allApps?: AppData[];
}

export const AppInfo: FC<AppInfoProps> = ({ app, allApps }) => {
  const screenshots =
    app.screenshots.length > 0 ? app.screenshots : getAppScreenshots(app);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <AppHeader app={app} />
      <ScreenshotCarousel screenshots={screenshots} label={app.label} />
      <SystemRequirements app={app} />
      <DownloadSection app={app} />
      {allApps && <RelatedApps app={app} allApps={allApps} />}
      <BackLink />
    </div>
  );
};

AppInfo.displayName = 'AppInfo';
