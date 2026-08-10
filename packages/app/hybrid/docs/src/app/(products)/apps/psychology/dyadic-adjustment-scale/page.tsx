'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { DyadicAdjustmentScale } from '@hieudoanm.github.io/components/routes/apps/psychology/DyadicAdjustmentScale';

const DyadicAdjustmentScalePage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <DyadicAdjustmentScale onClose={() => router.push('/apps/psychology')} />
    </Suspense>
  );
};

export default DyadicAdjustmentScalePage;
