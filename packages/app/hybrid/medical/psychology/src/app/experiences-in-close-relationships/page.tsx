'use client';

import { useRouter } from 'next/navigation';
import { ExperiencesInCloseRelationships } from '@/components/scales/ExperiencesInCloseRelationships';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="Experiences in Close Relationships">
      <ExperiencesInCloseRelationships onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
