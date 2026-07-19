'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { SnellenChart } from '@hieudoanm.github.io/components/routes/apps/health-vision/SnellenChart';

const ToolHealthVisionSnellen = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <SnellenChart onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolHealthVisionSnellen;
