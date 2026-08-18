'use client';

import { NoSleep } from '@hieudoanm.github.io/components/routes/apps/utilities/NoSleep';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const ToolUtilitiesNoSleep = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <NoSleep onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesNoSleep;
