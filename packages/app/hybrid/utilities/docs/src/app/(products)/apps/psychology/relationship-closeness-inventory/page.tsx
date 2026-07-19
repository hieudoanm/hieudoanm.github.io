'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { RelationshipClosenessInventory } from '@hieudoanm.github.io/components/routes/apps/psychology/RelationshipClosenessInventory';

const RelationshipClosenessInventoryPage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <RelationshipClosenessInventory
        onClose={() => router.push('/apps/psychology')}
      />
    </Suspense>
  );
};

export default RelationshipClosenessInventoryPage;
