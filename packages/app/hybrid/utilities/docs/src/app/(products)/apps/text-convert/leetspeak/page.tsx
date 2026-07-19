'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { LeetSpeak } from '@hieudoanm.github.io/components/routes/apps/text-convert/LeetSpeak';

const ToolTextConvertLeetspeak = () => {
  const router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <LeetSpeak onClose={() => router.push('/')} />
    </Suspense>
  );
};

export default ToolTextConvertLeetspeak;
