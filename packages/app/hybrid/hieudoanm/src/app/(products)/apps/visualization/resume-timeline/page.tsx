'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeTimeline } from '@hieudoanm.github.io/components/routes/apps/visualization/ResumeTimeline';

const ToolVisualizationResumeTimeline = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <ResumeTimeline onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolVisualizationResumeTimeline;
