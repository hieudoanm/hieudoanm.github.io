'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Fillomino } from '@/games/nikoli/Fillomino';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/fillomino/'
);

const FillominoPage: NextPage = () => (
  <GameContainer
    title="Fillomino"
    description="Fill regions so each matches its number."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Fillomino />
  </GameContainer>
);

export default FillominoPage;
