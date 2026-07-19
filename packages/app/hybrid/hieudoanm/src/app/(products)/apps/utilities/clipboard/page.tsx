'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Clipboard } from '@hieudoanm.github.io/components/routes/apps/utilities/Clipboard';

const ToolUtilitiesClipboard = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Clipboard onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesClipboard;
