'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Sign } from '@hieudoanm.github.io/components/routes/apps/education/Sign';

const ToolEducationSign = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Sign onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationSign;
