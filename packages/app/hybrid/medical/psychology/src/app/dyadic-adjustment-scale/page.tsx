'use client';

import { useRouter } from 'next/navigation';
import { DyadicAdjustmentScale } from '@/components/scales/DyadicAdjustmentScale';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Dyadic Adjustment Scale">
      <DyadicAdjustmentScale onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
