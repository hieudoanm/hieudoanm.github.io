'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { JsonToXml } from '@hieudoanm.github.io/components/routes/apps/data-xml/JsonToXml';

const ToolDataJsonJsonToXml = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <JsonToXml onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataJsonJsonToXml;
