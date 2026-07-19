'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Regex } from '@hieudoanm.github.io/components/routes/apps/editors/Regex';

const ToolEditorsRegex = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Regex onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEditorsRegex;
