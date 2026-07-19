'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { SplitCsv } from '@hieudoanm.github.io/components/routes/apps/data-csv/SplitCsv';

const ToolDataCsvSplitCsv = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <SplitCsv onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataCsvSplitCsv;
