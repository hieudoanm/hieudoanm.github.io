'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Masyu } from '@/games/nikoli/Masyu';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/masyu/'
);

const MasyuPage: NextPage = () => (
  <GameContainer
    title="Masyu"
    description="Draw a single loop through all pearls."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Masyu />
  </GameContainer>
);

export default MasyuPage;
