import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { NIKOLI_GAMES } from '@/games/nikoli/_shared/games';

const NikoliPage: FC = () => (
  <GamesTemplate
    title="Nikoli"
    subtitle="Classic Japanese logic puzzles, one grid at a time."
    items={NIKOLI_GAMES}
  />
);

export default NikoliPage;
