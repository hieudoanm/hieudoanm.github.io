'use client';

import { useEffect } from 'react';

export const SWRegister = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[SWRegister] registered', reg.scope);
        })
        .catch((err) => {
          console.warn('[SWRegister] registration failed', err);
        });
    }
  }, []);

  return null;
};
