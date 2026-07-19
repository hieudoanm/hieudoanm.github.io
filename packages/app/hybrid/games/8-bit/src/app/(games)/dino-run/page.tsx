'use client';

import { DinoRun } from '@/games/DinoRun';
import { NextPage } from 'next';

const DinoRunPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <DinoRun />
    </div>
  );
};

export default DinoRunPage;
