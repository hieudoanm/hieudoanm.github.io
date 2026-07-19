'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { SlotMachine } from '@/games/stem/maths/probability/slot-machine';

const SlotMachinePage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Slot Machine
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Three reels, six symbols, and a jackpot built to stay out of reach.
    </p>
    <SlotMachine />
  </div>
);

export default SlotMachinePage;
