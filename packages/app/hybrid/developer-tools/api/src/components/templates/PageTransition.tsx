'use client';

import { type FC, type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: FC<PageTransitionProps> = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-3 h-full duration-200">
    {children}
  </div>
);
