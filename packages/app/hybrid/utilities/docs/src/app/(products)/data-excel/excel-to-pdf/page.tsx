'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ExcelToPdf } from '@hieudoanm.github.io/components/routes/apps/data-excel/ExcelToPdf';

const ToolDataExcelExcelToPdf = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <ExcelToPdf onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataExcelExcelToPdf;
