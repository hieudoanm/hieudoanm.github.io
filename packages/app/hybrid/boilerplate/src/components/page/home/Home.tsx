'use client';

import { FC } from 'react';
import { useTheme } from '@/layout';
import { PreviewTabs } from './demo/PreviewTabs';
import { ComponentsDemo } from './demo/components/ComponentsDemo';

export const Home: FC = () => {
  const { config } = useTheme();

  return (
    <PreviewTabs colors={config.colors}>
      <ComponentsDemo />
    </PreviewTabs>
  );
};
Home.displayName = 'Home';
