'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { DOI } from '@hieudoanm.github.io/components/routes/apps/education/DOI';

const ToolEducationDoi = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <DOI onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationDoi;
