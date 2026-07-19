'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Manifest } from '@hieudoanm.github.io/components/routes/apps/editors/Manifest';

const ToolEditorsManifest = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Manifest onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEditorsManifest;
