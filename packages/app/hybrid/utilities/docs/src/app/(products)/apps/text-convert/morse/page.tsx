'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Morse } from '@hieudoanm.github.io/components/routes/apps/text-convert/Morse';

const ToolTextConvertMorse = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Morse onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolTextConvertMorse;
