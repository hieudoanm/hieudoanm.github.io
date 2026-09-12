'use client';

import { War } from '@/games/gambling/War';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/war/'
);

const Page: NextPage = () => (
  <GameContainer
    title="War"
    description="Higher card takes the stake — ties trigger wars that double the pot."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <War />
  </GameContainer>
);

export default Page;
