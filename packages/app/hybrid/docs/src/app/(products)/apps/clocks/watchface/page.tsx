'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { WatchFace } from '@hieudoanm.github.io/components/routes/apps/clocks/Watchface';

const ToolClocksWatchface = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <WatchFace onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolClocksWatchface;
