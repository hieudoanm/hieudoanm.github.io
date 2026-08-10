'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { PeriodicTable } from '@hieudoanm.github.io/components/routes/apps/education/PeriodicTable';

const ToolEducationPeriodicTable = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <PeriodicTable onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationPeriodicTable;
