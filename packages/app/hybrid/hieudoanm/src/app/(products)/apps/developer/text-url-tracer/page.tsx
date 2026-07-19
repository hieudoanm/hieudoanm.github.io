'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { TextUrlTracer } from '@hieudoanm.github.io/components/routes/apps/developer/TextUrlTracer';

const ToolDeveloperTextUrlTracer = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <TextUrlTracer onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDeveloperTextUrlTracer;
