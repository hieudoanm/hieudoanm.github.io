'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Shikaku } from '@/games/nikoli/Shikaku';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/shikaku/'
);

const ShikakuPage: NextPage = () => (
  <GameContainer
    title="Shikaku"
    description="Divide the grid into numbered rectangles."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Shikaku />
  </GameContainer>
);

export default ShikakuPage;
