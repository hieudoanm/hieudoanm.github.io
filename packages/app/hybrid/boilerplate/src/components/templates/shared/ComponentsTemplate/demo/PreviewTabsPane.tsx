'use client';

import { FC, ReactNode } from 'react';
import { ColorPalette } from './colors/ColorPalette';
import { PagesDirectory } from './pages/PagesDirectory';

export const PreviewTabsPane: FC<{
  active: string;
  colors: Record<string, string>;
  children: ReactNode;
}> = ({ active, colors, children }) => {
  if (active === 'Color Palette') {
    return <ColorPalette colors={colors} />;
  }
  if (active === 'Pages') {
    return <PagesDirectory />;
  }
  return <>{children}</>;
};
PreviewTabsPane.displayName = 'PreviewTabsPane';
