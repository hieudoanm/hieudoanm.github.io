'use client';

import { useEffect } from 'react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const PwaRegister: React.FC = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV === 'development') return;
    const url = `${BASE_PATH}/sw.js`;
    navigator.serviceWorker.register(url).catch(() => {
      // Offline support is best-effort; a failed registration is non-fatal.
    });
  }, []);

  return null;
};
