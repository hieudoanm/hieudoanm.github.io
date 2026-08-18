'use client';

import { type FC, useEffect, useState } from 'react';

const OfflineBanner: FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    setIsOffline(!navigator.onLine);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="alert alert-warning fixed top-0 right-0 left-0 z-50 rounded-none text-center text-sm">
      You are offline
    </div>
  );
};

export default OfflineBanner;
