'use client';

import { ComponentType, FC, Suspense } from 'react';
import { useRouter } from 'next/navigation';

interface ToolPageProps {
  Component: ComponentType<{ onClose: () => void }>;
}

export const ToolPage: FC<ToolPageProps> = ({ Component }) => {
  const router = useRouter();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <Component onClose={() => router.push('/')} />
    </Suspense>
  );
};
