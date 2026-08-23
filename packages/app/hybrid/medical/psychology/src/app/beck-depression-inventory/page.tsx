'use client';

import { useRouter } from 'next/navigation';
import { BeckDepressionInventory } from '@/components/scales/BeckDepressionInventory';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Beck Depression Inventory">
      <BeckDepressionInventory onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
