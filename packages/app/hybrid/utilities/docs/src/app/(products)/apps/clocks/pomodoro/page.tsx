'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Pomodoro } from '@hieudoanm.github.io/components/routes/apps/clocks/Pomodoro';

const ToolClocksPomodoro = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Pomodoro onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolClocksPomodoro;
