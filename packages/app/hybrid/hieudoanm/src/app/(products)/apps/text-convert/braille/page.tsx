'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Braille } from '@hieudoanm.github.io/components/routes/apps/text-convert/Braille';

const ToolTextConvertBraille = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Braille onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolTextConvertBraille;
