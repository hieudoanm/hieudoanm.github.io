'use client';

import { useRouter } from 'next/navigation';
import { Sudoku } from '@hieudoanm.github.io/components/routes/games/nikoli/Sudoku';

const GamesNikoliSudoku = () => {
  const router = useRouter();
  return <Sudoku onClose={() => router.push('/games/nikoli')} />;
};

export default GamesNikoliSudoku;
