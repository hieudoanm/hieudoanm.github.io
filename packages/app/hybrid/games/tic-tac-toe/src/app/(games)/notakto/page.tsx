'use client';

import { Notakto } from '@/games/notakto';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <div className="flex h-full flex-col">
    <Notakto />
  </div>
);

export default Page;
