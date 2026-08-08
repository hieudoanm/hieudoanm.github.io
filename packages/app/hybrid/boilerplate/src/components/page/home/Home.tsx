'use client';

import { FC } from 'react';
import { PreviewTabs } from './demo/PreviewTabs';
import { ComponentsDemo } from './demo/components/ComponentsDemo';

export const Home: FC = () => (
  <PreviewTabs>
    <ComponentsDemo />
  </PreviewTabs>
);
Home.displayName = 'Home';
