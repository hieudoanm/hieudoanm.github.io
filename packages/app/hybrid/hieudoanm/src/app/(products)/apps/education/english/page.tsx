'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LanguagesEnglish } from '@hieudoanm.github.io/components/routes/apps/education/English';

const ToolEducationEnglish = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <LanguagesEnglish onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolEducationEnglish;
