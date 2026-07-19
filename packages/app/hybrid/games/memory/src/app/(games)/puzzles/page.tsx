import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { PUZZLE_GAMES } from '@/games/puzzles/_shared/games';

const PuzzlesPage: FC = () => (
  <GamesTemplate
    title="Puzzles"
    subtitle="Classic brain teasers, number and logic puzzles."
    items={PUZZLE_GAMES}
  />
);

export default PuzzlesPage;
