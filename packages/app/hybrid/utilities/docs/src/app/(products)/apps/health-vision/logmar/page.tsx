'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LogMARChart } from '@hieudoanm.github.io/components/routes/apps/health-vision/LogMARChart';

const ToolHealthVisionLogmar = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <LogMARChart onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolHealthVisionLogmar;
