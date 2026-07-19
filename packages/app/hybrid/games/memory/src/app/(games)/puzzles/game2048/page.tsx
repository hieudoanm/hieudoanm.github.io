'use client';

import { Game2048 } from '@/games/puzzles/Game2048';
import { GameContainer } from '@/components/organisms/GameContainer';
import { PUZZLE_GAMES } from '@/games/puzzles/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = PUZZLE_GAMES.filter(
  (game) => game.href !== '/puzzles/game2048/'
);

const Game2048Page: NextPage = () => (
  <GameContainer
    title="2048"
    description="Slide tiles and merge to reach 2048."
    relatedGames={RELATED_GAMES}
    backHref="/puzzles/">
    <Game2048 onClose={() => {}} />
  </GameContainer>
);

export default Game2048Page;
