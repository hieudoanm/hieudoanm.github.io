'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { IP } from '@hieudoanm.github.io/components/routes/apps/developer/IP';

const ToolDeveloperIp = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <IP onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDeveloperIp;
