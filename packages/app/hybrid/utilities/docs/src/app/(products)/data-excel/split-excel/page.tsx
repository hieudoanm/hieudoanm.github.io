'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { SplitExcel } from '@hieudoanm.github.io/components/routes/apps/data-excel/SplitExcel';

const ToolDataExcelSplitExcel = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <SplitExcel onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataExcelSplitExcel;
