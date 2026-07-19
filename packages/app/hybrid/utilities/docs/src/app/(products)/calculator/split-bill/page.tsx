'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { SplitBill } from '@hieudoanm.github.io/components/routes/apps/calculator/SplitBill';

const ToolCalculatorSplitBill = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <SplitBill onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolCalculatorSplitBill;
