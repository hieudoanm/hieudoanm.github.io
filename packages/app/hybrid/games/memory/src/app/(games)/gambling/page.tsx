import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';

const GamblingPage: FC = () => (
  <GamesTemplate
    title="Gambling"
    subtitle="Casino classics — baccarat, roulette, craps and more."
    items={GAMBLING_GAMES}
  />
);

export default GamblingPage;
