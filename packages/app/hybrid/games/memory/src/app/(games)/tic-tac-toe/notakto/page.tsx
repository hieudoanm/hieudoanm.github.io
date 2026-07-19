'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { Notakto } from '@/games/tic-tac-toe/notakto';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/notakto/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Notakto"
    description="Everyone plays X — complete a row of three and you lose."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <Notakto />
  </GameContainer>
);

export default Page;
