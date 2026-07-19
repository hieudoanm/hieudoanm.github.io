'use client';

import { Roulette } from '@/games/gambling/Roulette';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/roulette/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Roulette"
    description="Single-zero wheel — red, black, even, odd, high, low or straight-up zero."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <Roulette />
  </GameContainer>
);

export default Page;
