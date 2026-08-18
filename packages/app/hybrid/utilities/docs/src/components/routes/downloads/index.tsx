'use client';

import { FC } from 'react';

import { DOWNLOAD_SECTIONS } from '@hieudoanm.github.io/components/routes/downloads/data/downloads';
import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';

export const DownloadsPage: FC = () => (
  <AppsStoreTemplate title="Downloads" sections={DOWNLOAD_SECTIONS} />
);
DownloadsPage.displayName = 'DownloadsPage';
