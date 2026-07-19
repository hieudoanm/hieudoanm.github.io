'use client';

import { useEffect, useState } from 'react';
import { detectBrowser, type BrowserInfo } from '@/lib/browser';

export const useBrowserDetect = (): BrowserInfo => {
  const [info, setInfo] = useState<BrowserInfo>({
    browser: 'unknown',
    engine: 'unknown',
    version: '0',
    isMobile: false,
  });

  useEffect(() => {
    setInfo(detectBrowser());
  }, []);

  return info;
};
