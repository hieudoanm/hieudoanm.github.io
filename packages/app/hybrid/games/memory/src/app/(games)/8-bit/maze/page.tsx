'use client';

import { Maze } from '@/games/8-bit/Maze';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Maze />
  </div>
);

export default Page;
