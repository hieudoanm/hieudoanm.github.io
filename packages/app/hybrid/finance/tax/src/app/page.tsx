'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RootPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/personal');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
};

export default RootPage;
