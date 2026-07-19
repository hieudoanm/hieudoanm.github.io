'use client';

import { FC } from 'react';

import { AppsStoreTemplate } from '@hieudoanm.github.io/components/templates/app/AppsStoreTemplate';
import { getGameSections } from './games-data';

const sections = getGameSections();

export const GamesPage: FC = () => (
  <AppsStoreTemplate title="Games" sections={sections} />
);
GamesPage.displayName = 'GamesPage';
