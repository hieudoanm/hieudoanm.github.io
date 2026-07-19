'use client';

import { useRouter } from 'next/navigation';
import { Resume } from '@hieudoanm.github.io/components/routes/resume';

const MePage = () => {
  const router = useRouter();

  return <Resume onClose={() => router.push('/')} />;
};

export default MePage;
