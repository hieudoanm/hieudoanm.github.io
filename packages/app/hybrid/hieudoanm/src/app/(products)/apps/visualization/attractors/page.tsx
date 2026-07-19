'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Attractors } from '@hieudoanm.github.io/components/routes/apps/visualization/Attractors';

const ToolVisualizationAttractors = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Attractors onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolVisualizationAttractors;
