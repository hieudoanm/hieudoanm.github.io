'use client';

import { NextPage } from 'next';

import { Sudoku } from '@/games/nikoli/Sudoku';

const SudokuPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Sudoku />
    </div>
  );
};

export default SudokuPage;
