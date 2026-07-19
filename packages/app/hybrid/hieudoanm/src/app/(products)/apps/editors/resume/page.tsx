'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Resume } from '@hieudoanm.github.io/components/routes/apps/editors/Resume';

const ToolEditorsResume = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Resume onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEditorsResume;
