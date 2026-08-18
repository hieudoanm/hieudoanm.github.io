'use client';

import { useRouter } from 'next/navigation';
import { PatientHealthQuestionnaire } from '@/components/scales/PatientHealthQuestionnaire';
import { ToolTemplate } from '@/components/templates/ToolTemplate';

const Page = () => {
  const router = useRouter();
  return (
    <ToolTemplate title="PHQ-9">
      <PatientHealthQuestionnaire onClose={() => router.push('/')} />
    </ToolTemplate>
  );
};

export default Page;
