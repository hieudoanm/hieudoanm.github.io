'use client';

import { FC, ReactNode } from 'react';
import { PagesDirectory } from './pages/PagesDirectory';

export const PreviewTabsPane: FC<{
  active: string;
  children: ReactNode;
}> = ({ active, children }) => {
  if (active === 'Pages') {
    return <PagesDirectory />;
  }
  return <>{children}</>;
};
PreviewTabsPane.displayName = 'PreviewTabsPane';
