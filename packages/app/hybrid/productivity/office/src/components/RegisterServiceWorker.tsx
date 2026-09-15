'use client';

import { FC, useEffect } from 'react';

const RegisterServiceWorker: FC = () => {
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

  return null;
};

export default RegisterServiceWorker;
