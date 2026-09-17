'use client';

import Link from 'next/link';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { TIC_TAC_TOE_GAMES } from '@/games/health/psychology/cognitive/reasoning/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const TicTacToePage: NextPage = () => (
  <GamesTemplate
    title="Tic-Tac-Toe"
    subtitle="Six ways to play the classic grid duel."
    items={TIC_TAC_TOE_GAMES}>
    <Link
      href="/psychology/cognitive/reasoning"
      className="text-primary text-sm hover:underline">
      ← Back to Reasoning
    </Link>
  </GamesTemplate>
);

export default TicTacToePage;
