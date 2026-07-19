'use client';

import { useEffect } from 'react';

export const useRegisterServiceWorker = (): void => {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator) ||
      !navigator.serviceWorker
    ) {
      return;
    }
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }, []);
};
