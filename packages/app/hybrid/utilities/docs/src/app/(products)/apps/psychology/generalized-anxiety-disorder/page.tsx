'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { GeneralizedAnxietyDisorderScale } from '@hieudoanm.github.io/components/routes/apps/psychology/GeneralizedAnxietyDisorderScale';

const GeneralizedAnxietyDisorderPage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <GeneralizedAnxietyDisorderScale
        onClose={() => router.push('/apps/psychology')}
      />
    </Suspense>
  );
};

export default GeneralizedAnxietyDisorderPage;
