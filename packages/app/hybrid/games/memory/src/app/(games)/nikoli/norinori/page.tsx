'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Norinori } from '@/games/nikoli/Norinori';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/norinori/'
);

const NorinoriPage: NextPage = () => (
  <GameContainer
    title="Norinori"
    description="Shade two cells in every domino region."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Norinori />
  </GameContainer>
);

export default NorinoriPage;
