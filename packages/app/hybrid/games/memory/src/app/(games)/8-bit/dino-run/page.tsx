'use client';

import { DinoRun } from '@/games/8-bit/DinoRun';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <DinoRun />
  </div>
);

export default Page;
