'use client';

import { Suspense, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { StudiesTemplate } from '@/components/templates/StudiesTemplate';
import { api } from '@/lib/api/client';

const StudiesContent: FC = () => {
  const searchParams = useSearchParams();
  const datasetId = searchParams.get('dataset') ?? '';
  if (!datasetId) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl p-8">
        <div className="alert alert-warning">
          <span>No dataset selected. Open one from the workspace.</span>
        </div>
      </main>
    );
  }
  return <StudiesTemplate api={api} datasetId={datasetId} />;
};

const StudiesPage: FC = () => (
  <Suspense fallback={<span className="loading loading-spinner loading-lg" />}>
    <StudiesContent />
  </Suspense>
);

export default StudiesPage;
