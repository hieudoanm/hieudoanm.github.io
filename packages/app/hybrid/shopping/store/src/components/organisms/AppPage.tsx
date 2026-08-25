'use client';

import { AppInfo } from '@/components/molecules/AppInfo';
import downloads from '@/data/downloads.json';
import { parseDownloads } from '@/lib/downloads';
import { useParams } from 'next/navigation';
import type { FC } from 'react';

const ALL_APPS = parseDownloads(
  downloads as Parameters<typeof parseDownloads>[0]
);

export const AppPage: FC = () => {
  const params = useParams<{ slug: string }>();
  const app = ALL_APPS.find((a) => a.slug === params.slug);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h1 className="mb-4 text-2xl font-thin">App not found</h1>
        <a href="/" className="btn btn-primary btn-sm">
          Back to Store
        </a>
      </div>
    );
  }

  return <AppInfo app={app} />;
};

AppPage.displayName = 'AppPage';
