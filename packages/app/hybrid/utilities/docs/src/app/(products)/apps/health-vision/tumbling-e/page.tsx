'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { TumblingEChart } from '@hieudoanm.github.io/components/routes/apps/health-vision/TumblingEChart';

const ToolHealthVisionTumblingE = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <TumblingEChart onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolHealthVisionTumblingE;
