'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CsvToJson } from '@hieudoanm.github.io/components/routes/apps/data-csv/CsvToJson';

const ToolDataCsvCsvToJson = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <CsvToJson onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataCsvCsvToJson;
