'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { WordCounter } from '@hieudoanm.github.io/components/routes/apps/editors/WordCounter';

const ToolEditorsWordCounter = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <WordCounter onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEditorsWordCounter;
