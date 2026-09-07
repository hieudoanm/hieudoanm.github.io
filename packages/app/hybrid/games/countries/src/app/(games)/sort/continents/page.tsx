'use client';

import { ContinentsSort } from '@/games/sort-continents';
import { NextPage } from 'next';

const ContinentsSortPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <ContinentsSort />
    </div>
  );
};

export default ContinentsSortPage;
