'use client';

import { useRouter } from 'next/navigation';
import { Typoglycemia } from '@hieudoanm.github.io/components/routes/games/word/Typoglycemia';

const GamesWordTypoglycemia = () => {
  const router = useRouter();
  return <Typoglycemia onClose={() => router.push('/games/word')} />;
};

export default GamesWordTypoglycemia;
