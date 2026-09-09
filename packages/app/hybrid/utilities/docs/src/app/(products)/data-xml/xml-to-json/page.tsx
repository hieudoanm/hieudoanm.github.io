'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { XmlToJson } from '@hieudoanm.github.io/components/routes/apps/data-xml/XmlToJson';

const ToolDataXmlXmlToJson = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <XmlToJson onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDataXmlXmlToJson;
