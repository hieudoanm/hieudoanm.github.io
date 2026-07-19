'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Emojis } from '@hieudoanm.github.io/components/routes/apps/utilities/Emojis';

const ToolUtilitiesEmojis = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Emojis onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesEmojis;
