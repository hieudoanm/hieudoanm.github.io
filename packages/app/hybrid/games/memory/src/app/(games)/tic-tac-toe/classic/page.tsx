'use client';

import { Classic } from '@/games/tic-tac-toe/classic';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Classic />
  </div>
);

export default Page;
