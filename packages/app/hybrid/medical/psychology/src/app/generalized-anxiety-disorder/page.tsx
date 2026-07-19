'use client';

import { useRouter } from 'next/navigation';
import { GeneralizedAnxietyDisorderScale } from '@/components/scales/GeneralizedAnxietyDisorderScale';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="GAD-7">
      <GeneralizedAnxietyDisorderScale onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
