import type { FC } from 'react';
import { GamesTemplate } from '@/components/templates/GamesTemplate';
import { MEMORY_GAMES } from '@/games/memory/_shared/games';

const MemoryGamesPage: FC = () => (
  <GamesTemplate
    title="Memory"
    subtitle="Train your brain with memory and cognitive challenges."
    items={MEMORY_GAMES}
  />
);

export default MemoryGamesPage;
