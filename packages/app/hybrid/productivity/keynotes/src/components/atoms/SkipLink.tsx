'use client';

import { type FC } from 'react';

export const SkipLink: FC = () => (
  <a
    href="#main-content"
    className="bg-primary text-primary-content sr-only z-[100] rounded-lg px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
    Skip to main content
  </a>
);
