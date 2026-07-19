'use client';

import { useEffect, useState } from 'react';

export const useOffline = (): boolean => {
  const [offline, setOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  useEffect(() => {
    const markOnline = (): void => setOffline(false);
    const markOffline = (): void => setOffline(true);
    window.addEventListener('online', markOnline);
    window.addEventListener('offline', markOffline);
    return () => {
      window.removeEventListener('online', markOnline);
      window.removeEventListener('offline', markOffline);
    };
  }, []);
  return offline;
};
