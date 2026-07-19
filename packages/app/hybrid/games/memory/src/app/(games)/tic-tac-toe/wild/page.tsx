'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { Wild } from '@/games/tic-tac-toe/wild';
import { TIC_TAC_TOE_GAMES } from '@/games/tic-tac-toe/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = TIC_TAC_TOE_GAMES.filter(
  (game) => game.href !== '/tic-tac-toe/wild/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Wild"
    description="Pick X or O every turn — either mark can win the game."
    relatedGames={RELATED_GAMES}
    backHref="/tic-tac-toe/">
    <Wild />
  </GameContainer>
);

export default Page;
