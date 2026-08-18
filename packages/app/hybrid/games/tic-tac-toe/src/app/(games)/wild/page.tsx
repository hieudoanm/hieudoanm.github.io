'use client';

import { Wild } from '@/games/wild';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Wild />
  </div>
);

export default Page;
