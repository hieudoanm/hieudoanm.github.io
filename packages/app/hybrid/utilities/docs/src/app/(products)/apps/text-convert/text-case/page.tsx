'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { TextCase } from '@hieudoanm.github.io/components/routes/apps/text-convert/TextCase';

const ToolTextConvertTextCase = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <TextCase onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolTextConvertTextCase;
