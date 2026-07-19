'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CreateZip } from '@hieudoanm.github.io/components/routes/apps/utilities/CreateZip';

const ToolUtilitiesCreateZip = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <CreateZip onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesCreateZip;
