'use client';

import type { AppData } from '@/lib/downloads';
import { getAppScreenshots } from '@/lib/screenshots';
import Link from 'next/link';
import type { FC } from 'react';
import { PiGithubLogo } from 'react-icons/pi';
import { AppHeader } from './sections/AppHeader';
import { BackLink } from './sections/BackLink';
import { DownloadSection } from './sections/DownloadSection';
import { RelatedApps } from './sections/RelatedApps';
import { ScreenshotCarousel } from './sections/ScreenshotCarousel';
import { SystemRequirements } from './sections/SystemRequirements';
import { WebVersion } from './sections/WebVersion';

interface AppInfoProps {
  app: AppData;
  allApps?: AppData[];
  screenshots?: string[];
  releaseUrl?: string;
}

export const AppInfo: FC<AppInfoProps> = ({
  app,
  allApps,
  screenshots = [],
  releaseUrl = '',
}) => {
  const images = screenshots.length > 0 ? screenshots : getAppScreenshots(app);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <AppHeader app={app} />
      {releaseUrl && (
        <div className="mb-8 flex justify-center">
          <Link
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm gap-2">
            <PiGithubLogo className="text-base" />
            GitHub Releases
          </Link>
        </div>
      )}
      <ScreenshotCarousel screenshots={images} label={app.label} />
      <SystemRequirements app={app} />
      <WebVersion app={app} />
      <DownloadSection app={app} />
      {allApps && <RelatedApps app={app} allApps={allApps} />}
      <BackLink />
    </div>
  );
};

AppInfo.displayName = 'AppInfo';
