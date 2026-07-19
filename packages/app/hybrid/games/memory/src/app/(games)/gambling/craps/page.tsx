'use client';

import { Craps } from '@/games/gambling/Craps';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/craps/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Craps"
    description="Pass line: come-out 7/11 wins, set a point and roll it before a seven."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <Craps />
  </GameContainer>
);

export default Page;
