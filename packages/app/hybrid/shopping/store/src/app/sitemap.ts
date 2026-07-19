import type { MetadataRoute } from 'next';
import { parseDownloads } from '@/lib/downloads';
import downloads from '@/data/downloads.json';

export const dynamic = 'force-static';

const ALL_APPS = parseDownloads(
  downloads as Parameters<typeof parseDownloads>[0]
);

const BASE_URL = 'https://hieudoanm.github.io/free/store';

const sitemap = (): MetadataRoute.Sitemap => {
  const appUrls = ALL_APPS.map((app) => ({
    url: `${BASE_URL}/app/${app.slug}/`,
    lastModified: app.lastUpdated || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...appUrls,
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/version/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
};

export default sitemap;
