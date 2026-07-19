'use client';

import { LightsOut } from '@/games/puzzles/LightsOut';
import { GameContainer } from '@/components/organisms/GameContainer';
import { PUZZLE_GAMES } from '@/games/puzzles/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = PUZZLE_GAMES.filter(
  (game) => game.href !== '/puzzles/lights-out/'
);

const LightsOutPage: NextPage = () => (
  <GameContainer
    title="Lights Out"
    description="Toggle cells to turn off every light."
    relatedGames={RELATED_GAMES}
    backHref="/puzzles/">
    <LightsOut onClose={() => {}} />
  </GameContainer>
);

export default LightsOutPage;
