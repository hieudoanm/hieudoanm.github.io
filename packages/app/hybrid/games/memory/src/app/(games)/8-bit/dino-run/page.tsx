'use client';

import { DinoRun } from '@/games/8-bit/DinoRun';
import { EIGHT_BIT_GAMES } from '@/games/8-bit/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = EIGHT_BIT_GAMES.filter(
  (game) => game.href !== '/8-bit/dino-run/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Dino Run"
    description="Infinite runner."
    relatedGames={RELATED_GAMES}
    backHref="/8-bit/">
    <DinoRun />
  </GameContainer>
);

export default Page;
