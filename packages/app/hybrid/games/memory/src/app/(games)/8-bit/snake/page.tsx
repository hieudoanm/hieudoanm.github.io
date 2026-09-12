'use client';

import { Snake } from '@/games/8-bit/Snake';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Snake />
  </div>
);

export default Page;
