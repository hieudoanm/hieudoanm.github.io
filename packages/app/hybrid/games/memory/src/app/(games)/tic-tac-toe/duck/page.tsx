'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { Duck } from '@/games/tic-tac-toe/duck';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/duck/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Duck"
    description="Place your mark, then move the duck to block your opponent."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <Duck />
  </GameContainer>
);

export default Page;
