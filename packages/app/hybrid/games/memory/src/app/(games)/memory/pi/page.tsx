'use client';

import { Pi } from '@/games/memory/PiNumber';
import { GameContainer } from '@/components/organisms/GameContainer';
import { MEMORY_GAMES } from '@/games/memory/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = MEMORY_GAMES.filter(
  (game) => game.href !== '/memory/pi/'
);

const PiPage: NextPage = () => (
  <GameContainer
    title="Pi"
    description="Pi digit memorization."
    relatedGames={RELATED_GAMES}
    backHref="/memory/">
    <Pi onClose={() => {}} />
  </GameContainer>
);

export default PiPage;
