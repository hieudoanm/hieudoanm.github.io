'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Slides } from '@hieudoanm.github.io/components/routes/apps/editors/Slides';
import { NextPage } from 'next';

const ToolEditorsSlides: NextPage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Slides onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEditorsSlides;
