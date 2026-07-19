'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ScreenRecorder } from '@hieudoanm.github.io/components/routes/apps/utilities/ScreenRecorder';

const ToolUtilitiesScreenRecorder = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <ScreenRecorder onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesScreenRecorder;
