'use client';

import { Snake } from '@/games/8-bit/Snake';
import { EIGHT_BIT_GAMES } from '@/games/8-bit/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = EIGHT_BIT_GAMES.filter(
  (game) => game.href !== '/8-bit/snake/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Snake"
    description="Classic snake on a 12×12 grid."
    relatedGames={RELATED_GAMES}
    backHref="/8-bit/">
    <Snake />
  </GameContainer>
);

export default Page;
