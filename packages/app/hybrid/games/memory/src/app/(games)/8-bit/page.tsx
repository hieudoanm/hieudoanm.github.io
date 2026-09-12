import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { EIGHT_BIT_GAMES } from '@/games/8-bit/_shared/games';

const EightBitPage: FC = () => (
  <GamesTemplate
    title="8-Bit"
    subtitle="Retro arcade classics on an 8-bit grid."
    items={EIGHT_BIT_GAMES}
  />
);

export default EightBitPage;
