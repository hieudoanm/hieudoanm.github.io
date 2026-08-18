'use client';

import { useRouter } from 'next/navigation';
import { TumblingEChart } from '@/components/charts/TumblingEChart';

const TumblingEPage = () => {
  const router = useRouter();
  return <TumblingEChart onClose={() => router.push('/')} />;
};

export default TumblingEPage;
