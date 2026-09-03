'use client';

import { FC } from 'react';
import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';

const DownloadsPage: FC = () => (
  <div className="flex flex-col">
    <DownloadsTemplate
      version="0.0.1"
      items={[
        {
          platform: 'Web',
          requirements: 'Any modern browser',
          label: 'Open',
          href: 'https://hieudoanm.github.io/clock',
        },
        {
          platform: 'macOS',
          requirements: 'macOS 10.15+',
          label: 'Download',
          href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
        },
        {
          platform: 'Windows',
          requirements: 'Windows 10+',
          label: 'Download',
          href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
        },
        {
          platform: 'Linux',
          requirements: 'AppImage',
          label: 'Download',
          href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
        },
      ]}
    />
  </div>
);

export default DownloadsPage;
