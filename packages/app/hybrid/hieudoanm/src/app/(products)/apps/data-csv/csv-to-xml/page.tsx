'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CsvToXml } from '@hieudoanm.github.io/components/routes/apps/data-csv/CsvToXml';

const ToolDataCsvCsvToXml = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <CsvToXml onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataCsvCsvToXml;
