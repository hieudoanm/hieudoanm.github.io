'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { JsonToCsv } from '@hieudoanm.github.io/components/routes/apps/data-json/JsonToCsv';

const ToolDataJsonJsonToCsv = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <JsonToCsv onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataJsonJsonToCsv;
