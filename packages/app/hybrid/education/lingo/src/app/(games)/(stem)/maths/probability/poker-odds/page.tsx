'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { PokerOdds } from '@/games/stem/maths/probability/poker-odds';

const PokerOddsPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/maths/probability"
      className="text-primary text-sm hover:underline">
      ← Back to Probability
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Poker Odds
    </h1>
    <p className="text-base-content/60 -mt-2 text-sm">
      Monte Carlo equity for a Texas Hold’em hand against up to nine players.
    </p>
    <PokerOdds />
  </div>
);

export default PokerOddsPage;
