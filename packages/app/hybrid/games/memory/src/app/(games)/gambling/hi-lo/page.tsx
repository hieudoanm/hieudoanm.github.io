'use client';

import { HiLo } from '@/games/gambling/HiLo';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/hi-lo/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Hi-Lo"
    description="Will the next card be higher or lower? Build streaks for 2:1 payouts."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <HiLo />
  </GameContainer>
);

export default Page;
