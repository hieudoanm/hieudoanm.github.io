'use client';

import { type FC, type ReactNode } from 'react';

const SkipToContent: FC = () => (
  <a
    href="#main-content"
    className="focus:bg-primary focus:text-primary-content sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-4 focus:py-2">
    Skip to content
  </a>
);

export default SkipToContent;
