'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Kaprekar } from '@hieudoanm.github.io/components/routes/apps/utilities/Kaprekar';

const ToolUtilitiesKaprekar = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Kaprekar onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesKaprekar;
