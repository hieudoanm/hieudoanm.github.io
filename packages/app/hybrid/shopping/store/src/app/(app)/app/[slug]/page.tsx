import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseDownloads, getReleasePageUrl } from '@/lib/downloads';
import downloads from '@/data/downloads.json';
import { AppPage } from '@/components/organisms/AppPage';

const SCREENSHOT_PAGES = ['home', 'about', 'downloads', 'version'] as const;

const getScreenshots = (slug: string): string[] =>
  SCREENSHOT_PAGES.filter((page) =>
    existsSync(
      join(process.cwd(), 'public', 'screenshots', slug, `${page}.png`)
    )
  ).map((page) => `/screenshots/${slug}/${page}.png`);

const ALL_APPS = parseDownloads(
  downloads as Parameters<typeof parseDownloads>[0]
);

export const generateStaticParams = () =>
  ALL_APPS.map((app) => ({ slug: app.slug }));

type PageProps = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const app = ALL_APPS.find((a) => a.slug === slug);
  if (!app) return { title: 'App Not Found' };

  return {
    title: `${app.label} - Store`,
    description: `${app.primaryCategory} - Download ${app.label}`,
    openGraph: {
      title: `${app.label} - Store`,
      description: app.primaryCategory,
      type: 'website',
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const app = ALL_APPS.find((a) => a.slug === slug);
  return (
    <AppPage
      screenshots={getScreenshots(slug)}
      releaseUrl={app ? getReleasePageUrl(app) : ''}
    />
  );
};

export default Page;
