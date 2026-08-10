'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ExperiencesInCloseRelationships } from '@hieudoanm.github.io/components/routes/apps/psychology/ExperiencesInCloseRelationships';

const ExperiencesInCloseRelationshipsPage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <ExperiencesInCloseRelationships
        onClose={() => router.push('/apps/psychology')}
      />
    </Suspense>
  );
};

export default ExperiencesInCloseRelationshipsPage;
