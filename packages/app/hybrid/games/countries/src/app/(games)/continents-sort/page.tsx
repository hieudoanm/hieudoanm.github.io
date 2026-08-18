'use client';

import { ContinentsSort } from '@/games/continents-sort';
import { NextPage } from 'next';

const ContinentsSortPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <ContinentsSort />
    </div>
  );
};

export default ContinentsSortPage;
