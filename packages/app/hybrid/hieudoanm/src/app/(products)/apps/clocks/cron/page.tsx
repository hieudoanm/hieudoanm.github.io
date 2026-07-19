'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Cron } from '@hieudoanm.github.io/components/routes/apps/clocks/Cron';

const ToolClocksCron = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Cron onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolClocksCron;
