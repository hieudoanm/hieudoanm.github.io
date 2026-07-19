'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { Classic } from '@/games/tic-tac-toe/classic';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/classic/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Classic"
    description="X and O on a 3×3 grid — line up three to win."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <Classic />
  </GameContainer>
);

export default Page;
