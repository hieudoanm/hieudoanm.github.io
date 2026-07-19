'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LoremIpsum } from '@hieudoanm.github.io/components/routes/apps/utilities/LoremIpsum';

const ToolUtilitiesLoremIpsum = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <LoremIpsum onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolUtilitiesLoremIpsum;
