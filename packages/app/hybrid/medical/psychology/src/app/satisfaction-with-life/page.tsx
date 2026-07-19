'use client';

import { useRouter } from 'next/navigation';
import { SatisfactionWithLifeScale } from '@/components/scales/SatisfactionWithLifeScale';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Satisfaction With Life Scale">
      <SatisfactionWithLifeScale onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
