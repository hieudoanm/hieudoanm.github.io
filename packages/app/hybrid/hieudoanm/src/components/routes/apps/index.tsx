'use client';

import { FC } from 'react';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { getAppSections } from './data/apps';

const sections = getAppSections();

export const AppPage: FC = () => (
  <AppsStoreTemplate title="Apps" sections={sections} />
);
AppPage.displayName = 'AppPage';
