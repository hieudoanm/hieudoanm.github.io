'use client';

import { useRouter } from 'next/navigation';
import { RelationshipClosenessInventory } from '@/components/scales/RelationshipClosenessInventory';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Relationship Closeness Inventory">
      <RelationshipClosenessInventory onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
