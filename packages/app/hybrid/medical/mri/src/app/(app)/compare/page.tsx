'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api/client';
import { CompareTemplate } from '@/components/templates/CompareTemplate';

const ComparePageContent = () => {
  const searchParams = useSearchParams();
  const left = searchParams.get('left') ?? '';
  const right = searchParams.get('right') ?? '';
  if (!left || !right) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl p-8">
        <div className="alert alert-warning" role="alert">
          <span>
            Provide two series to compare:
            /compare?left=series://…&amp;right=series://…
          </span>
        </div>
      </main>
    );
  }
  return (
    <CompareTemplate api={api} leftSeriesId={left} rightSeriesId={right} />
  );
};

const ComparePage = () => (
  <Suspense>
    <ComparePageContent />
  </Suspense>
);

export default ComparePage;
