'use client';

import { useRouter } from 'next/navigation';
import { BigFiveInventory } from '@/components/scales/BigFiveInventory';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Big Five Inventory">
      <BigFiveInventory onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
