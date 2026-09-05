'use client';

import Link from 'next/link';
import { AppInfo } from '@/components/molecules/AppInfo';
import downloads from '@/data/downloads.json';
import { parseDownloads } from '@/lib/downloads';
import { useParams } from 'next/navigation';
import { useEffect, type FC } from 'react';
import { useRecentlyViewed } from '@/lib/hooks';

const ALL_APPS = parseDownloads(
  downloads as Parameters<typeof parseDownloads>[0]
);

export const AppPage: FC<{
  screenshots?: string[];
  releaseUrl?: string;
}> = ({ screenshots = [], releaseUrl = '' }) => {
  const params = useParams<{ slug: string }>();
  const app = ALL_APPS.find((a) => a.slug === params.slug);
  const { addRecent } = useRecentlyViewed();

  useEffect(() => {
    if (app) addRecent(app.slug);
  }, [app, addRecent]);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h1 className="mb-4 text-2xl font-thin">App not found</h1>
        <Link href="/" className="btn btn-primary btn-sm">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <AppInfo
      app={app}
      allApps={ALL_APPS}
      screenshots={screenshots}
      releaseUrl={releaseUrl}
    />
  );
};

AppPage.displayName = 'AppPage';
