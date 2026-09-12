'use client';

import { Towers } from '@/games/puzzles/Towers';
import { NextPage } from 'next';

const TowersPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <Towers onClose={() => {}} />
  </div>
);

export default TowersPage;
