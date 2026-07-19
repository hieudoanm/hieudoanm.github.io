'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CsvToExcel } from '@hieudoanm.github.io/components/routes/apps/data-csv/CsvToExcel';

const ToolDataCsvCsvToExcel = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <CsvToExcel onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataCsvCsvToExcel;
