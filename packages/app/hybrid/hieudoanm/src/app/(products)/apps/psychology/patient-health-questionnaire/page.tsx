'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { PatientHealthQuestionnaire } from '@hieudoanm.github.io/components/routes/apps/psychology/PatientHealthQuestionnaire';

const PatientHealthQuestionnairePage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <PatientHealthQuestionnaire
        onClose={() => router.push('/apps/psychology')}
      />
    </Suspense>
  );
};

export default PatientHealthQuestionnairePage;
