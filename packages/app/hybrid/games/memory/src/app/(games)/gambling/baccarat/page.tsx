'use client';

import { Baccarat } from '@/games/gambling/Baccarat';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/baccarat/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Baccarat"
    description="Bet player, banker or tie — full third-card rules on a six-deck shoe."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <Baccarat />
  </GameContainer>
);

export default Page;
