'use client';

import Link from 'next/link';
import { Sudoku } from '@/games/Sudoku';
import { NextPage } from 'next';

const SudokuPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Sudoku />
    </div>
  );
};

export default SudokuPage;
