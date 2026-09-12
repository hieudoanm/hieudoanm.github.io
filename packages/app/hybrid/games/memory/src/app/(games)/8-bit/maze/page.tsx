'use client';

import { Maze } from '@/games/8-bit/Maze';
import { EIGHT_BIT_GAMES } from '@/games/8-bit/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = EIGHT_BIT_GAMES.filter(
  (game) => game.href !== '/8-bit/maze/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Maze"
    description="Random maze with BFS solver."
    relatedGames={RELATED_GAMES}
    backHref="/8-bit/">
    <Maze />
  </GameContainer>
);

export default Page;
