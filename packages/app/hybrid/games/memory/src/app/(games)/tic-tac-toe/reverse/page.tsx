'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { Reverse } from '@/games/tic-tac-toe/reverse';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/reverse/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Reverse"
    description="Misere rules: avoid making three in a row at all costs."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <Reverse />
  </GameContainer>
);

export default Page;
