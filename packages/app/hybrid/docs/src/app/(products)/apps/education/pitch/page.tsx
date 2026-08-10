'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Pitch } from '@hieudoanm.github.io/components/routes/apps/education/Pitch';

const ToolEducationPitch = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Pitch onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationPitch;
