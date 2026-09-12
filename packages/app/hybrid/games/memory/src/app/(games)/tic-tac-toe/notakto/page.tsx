'use client';

import { Notakto } from '@/games/tic-tac-toe/notakto';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Notakto />
  </div>
);

export default Page;
