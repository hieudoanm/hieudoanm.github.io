'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { DaysCount } from '@hieudoanm.github.io/components/routes/apps/clocks/DaysCount';

const ToolClocksDaysCount = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <DaysCount onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolClocksDaysCount;
