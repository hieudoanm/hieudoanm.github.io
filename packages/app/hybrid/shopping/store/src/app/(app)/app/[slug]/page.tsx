import type { Metadata } from 'next';
import { parseDownloads } from '@/lib/downloads';
import downloads from '@/data/downloads.json';
import { AppPage } from '@/components/organisms/AppPage';

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
    description: `${app.description} - Download ${app.label}`,
    openGraph: {
      title: `${app.label} - Store`,
      description: app.description,
      type: 'website',
    },
  };
};

const Page = () => <AppPage />;

export default Page;
