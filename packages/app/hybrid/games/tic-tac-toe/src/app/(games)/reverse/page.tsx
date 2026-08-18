'use client';

import { Reverse } from '@/games/reverse';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Reverse />
  </div>
);

export default Page;
