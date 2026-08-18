'use client';

import { useRouter } from 'next/navigation';
import { SnellenChart } from '@/components/charts/SnellenChart';

const SnellenPage = () => {
  const router = useRouter();
  return <SnellenChart onClose={() => router.push('/')} />;
};

export default SnellenPage;
