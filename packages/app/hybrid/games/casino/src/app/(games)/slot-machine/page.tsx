'use client';

import { SlotMachine } from '@/games/slot-machine';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <SlotMachine />
    </div>
  );
};

export default Page;
