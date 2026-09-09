'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from '@hieudoanm.github.io/components/routes/apps/developer/UUID';

const ToolDeveloperUuid = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <UUID onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDeveloperUuid;
