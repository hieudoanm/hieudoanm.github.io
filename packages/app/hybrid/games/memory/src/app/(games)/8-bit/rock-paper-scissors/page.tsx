'use client';

import { RockPaperScissors } from '@/games/8-bit/RockPaperScissors';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <RockPaperScissors />
  </div>
);

export default Page;
