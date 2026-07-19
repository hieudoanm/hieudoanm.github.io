'use client';

import { GameContainer } from '@/components/organisms/GameContainer';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';
import { Sudoku } from '@/games/nikoli/Sudoku';
import { NextPage } from 'next';

const RELATED_GAMES = NIKOLI_GAMES.filter(
  (game) => game.href !== '/nikoli/sudoku/'
);

const SudokuPage: NextPage = () => (
  <GameContainer
    title="Sudoku"
    description="Fill each row, column and box with digits 1–9."
    relatedGames={RELATED_GAMES}
    backHref="/nikoli/">
    <Sudoku />
  </GameContainer>
);

export default SudokuPage;
