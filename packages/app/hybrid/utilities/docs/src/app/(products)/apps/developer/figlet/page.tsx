'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Figlet } from '@hieudoanm.github.io/components/routes/apps/developer/Figlet';

const ToolDeveloperFiglet = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Figlet onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDeveloperFiglet;
