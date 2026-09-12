'use client';

import { SlidingPuzzle } from '@/games/puzzles/SlidingPuzzle';
import { GameContainer } from '@/components/organisms/GameContainer';
import { PUZZLE_GAMES } from '@/games/puzzles/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = PUZZLE_GAMES.filter(
  (game) => game.href !== '/puzzles/sliding-puzzle/'
);

const SlidingPuzzlePage: NextPage = () => (
  <GameContainer
    title="Sliding Puzzle"
    description="Reassemble an image by sliding tiles."
    relatedGames={RELATED_GAMES}
    backHref="/puzzles/">
    <SlidingPuzzle onClose={() => {}} />
  </GameContainer>
);

export default SlidingPuzzlePage;
