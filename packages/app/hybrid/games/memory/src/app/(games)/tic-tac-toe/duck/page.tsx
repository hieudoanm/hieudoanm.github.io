'use client';

import { Duck } from '@/games/tic-tac-toe/duck';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Duck />
  </div>
);

export default Page;
