'use client';

import { Suspense, type FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { ViewerTemplate } from '@/components/templates/ViewerTemplate';
import { api } from '@/lib/api/client';

const ViewerContent: FC = () => {
  const searchParams = useSearchParams();
  const seriesId = searchParams.get('series') ?? '';
  if (!seriesId) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl p-8">
        <div className="alert alert-warning">
          <span>No series selected. Open one from a study.</span>
        </div>
      </main>
    );
  }
  return <ViewerTemplate api={api} seriesId={seriesId} />;
};

const ViewerPage: FC = () => (
  <Suspense fallback={<span className="loading loading-spinner loading-lg" />}>
    <ViewerContent />
  </Suspense>
);

export default ViewerPage;
