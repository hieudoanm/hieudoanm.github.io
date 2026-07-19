'use client';

import { FC } from 'react';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { clis, extensions, packages } from './downloads-data';

const downloadSections = [
  { label: 'CLIs', items: clis },
  { label: 'Extensions', items: extensions },
  { label: 'Packages', items: packages },
];

export const DownloadsPage: FC = () => (
  <AppsStoreTemplate title="Downloads" sections={downloadSections} />
);
DownloadsPage.displayName = 'DownloadsPage';
