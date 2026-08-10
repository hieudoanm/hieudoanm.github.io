'use client';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { FC } from 'react';
import { BOOKMARK_SECTIONS } from './data/bookmarks';

export const Start: FC = () => {
  return <AppsStoreTemplate title="Start Page" sections={BOOKMARK_SECTIONS} />;
};

Start.displayName = 'Start';
