'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Flashcards } from '@hieudoanm.github.io/components/routes/apps/education/Flashcards';

const ToolEducationFlashcards = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Flashcards onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationFlashcards;
