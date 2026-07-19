'use client';

import { OverUnderSeven } from '@/games/gambling/OverUnderSeven';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/over-under-seven/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Over Under Seven"
    description="Two dice. Bet under 7, exactly 7 (5:1) or over 7."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <OverUnderSeven />
  </GameContainer>
);

export default Page;
