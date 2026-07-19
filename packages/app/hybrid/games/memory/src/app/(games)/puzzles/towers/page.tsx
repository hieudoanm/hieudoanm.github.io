'use client';

import { Towers } from '@/games/puzzles/Towers';
import { GameContainer } from '@/components/organisms/GameContainer';
import { PUZZLE_GAMES } from '@/games/puzzles/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = PUZZLE_GAMES.filter(
  (game) => game.href !== '/puzzles/towers/'
);

const TowersPage: NextPage = () => (
  <GameContainer
    title="Towers"
    description="Move the whole tower to the last peg."
    relatedGames={RELATED_GAMES}
    backHref="/puzzles/">
    <Towers onClose={() => {}} />
  </GameContainer>
);

export default TowersPage;
