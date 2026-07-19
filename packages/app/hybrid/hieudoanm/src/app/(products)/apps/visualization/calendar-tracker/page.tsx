'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarTracker } from '@hieudoanm.github.io/components/routes/apps/visualization/CalendarTracker';

const ToolVisualizationCalendarTracker = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <CalendarTracker onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolVisualizationCalendarTracker;
