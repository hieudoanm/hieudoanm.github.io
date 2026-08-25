import { parseDownloads } from '@/lib/downloads';
import downloads from '@/data/downloads.json';
import { AppPage } from '@/components/organisms/AppPage';
import { NextPage } from 'next';

const ALL_APPS = parseDownloads(
  downloads as Parameters<typeof parseDownloads>[0]
);

export const generateStaticParams = () =>
  ALL_APPS.map((app) => ({ slug: app.slug }));

const Page: NextPage = () => <AppPage />;

export default Page;
