'use client';

import { useRouter } from 'next/navigation';
import { LogMARChart } from '@/components/charts/LogMARChart';

const LogMARPage = () => {
  const router = useRouter();
  return <LogMARChart onClose={() => router.push('/')} />;
};

export default LogMARPage;
