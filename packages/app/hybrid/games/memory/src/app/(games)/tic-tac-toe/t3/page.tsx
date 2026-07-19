'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { T3 } from '@/games/tic-tac-toe/t3';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/t3/'
);

const Page: NextPage = () => (
  <GameContainer
    title="T3"
    description="Max three marks each — the fourth erases your oldest."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <T3 />
  </GameContainer>
);

export default Page;
