'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { RockPaperScissors } from '@/games/health/psychology/cognitive/attention/rock-paper-scissors';

const RockPaperScissorsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/psychology/cognitive/attention"
      className="text-primary text-sm hover:underline">
      ← Back to Attention
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Rock Paper Scissors
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      The bot commits first, you counter second — reaction time and accuracy
      traded against each other.
    </p>
    <RockPaperScissors />
  </div>
);

export default RockPaperScissorsPage;
