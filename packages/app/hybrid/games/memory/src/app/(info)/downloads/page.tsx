'use client';

import type { NextPage } from 'next';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';

const DownloadsPage: NextPage = () => (
  <DownloadsTemplate
    version="0.0.1"
    items={[
      {
        platform: 'Web',
        requirements: 'Any modern browser',
        label: 'Open',
        href: 'https://hieudoanm.github.io/downloads/memory',
      },
    ]}
  />
);

export default DownloadsPage;
