'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ProtocolsTemplate } from '@/components/templates/ProtocolsTemplate';

const ProtocolsPageContent = () => {
  const searchParams = useSearchParams();
  return (
    <ProtocolsTemplate
      api={api}
      initialDatasetId={searchParams.get('dataset') ?? undefined}
    />
  );
};

const ProtocolsPage = () => (
  <Suspense>
    <ProtocolsPageContent />
  </Suspense>
);

export default ProtocolsPage;
