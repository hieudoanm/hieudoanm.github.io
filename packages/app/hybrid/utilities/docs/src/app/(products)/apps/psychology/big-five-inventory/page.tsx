'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { BigFiveInventory } from '@hieudoanm.github.io/components/routes/apps/psychology/BigFiveInventory';

const BigFiveInventoryPage = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <BigFiveInventory onClose={() => router.push('/apps/psychology')} />
    </Suspense>
  );
};

export default BigFiveInventoryPage;
