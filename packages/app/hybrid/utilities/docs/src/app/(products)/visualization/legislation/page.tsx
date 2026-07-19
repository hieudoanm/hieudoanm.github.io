'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Legislation } from '@hieudoanm.github.io/components/routes/apps/visualization/Legislation';

const ToolVisualizationLegislation = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Legislation onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolVisualizationLegislation;
