'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Nurikabe } from '@/games/nikoli/Nurikabe';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/nurikabe/'
);

const NurikabePage: NextPage = () => (
  <GameContainer
    title="Nurikabe"
    description="Paint islands of white cells around each number."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Nurikabe />
  </GameContainer>
);

export default NurikabePage;
