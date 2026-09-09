'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ShopifyDetect } from '@hieudoanm.github.io/components/routes/apps/developer/ShopifyDetect';

const ToolDeveloperShopifyDetect = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <ShopifyDetect onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolDeveloperShopifyDetect;
