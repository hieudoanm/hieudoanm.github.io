'use client';

import { MemoryMatch } from '@/games/memory/MemoryMatch';
import { GameContainer } from '@/components/organisms/GameContainer';
import { MEMORY_GAMES } from '@/games/memory/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = MEMORY_GAMES.filter(
  (game) => game.href !== '/memory/memory-match/'
);

const MemoryMatchPage: NextPage = () => (
  <GameContainer
    title="Memory Match"
    description="Emoji card pairing grid."
    relatedGames={RELATED_GAMES}
    backHref="/memory/">
    <MemoryMatch onClose={() => {}} />
  </GameContainer>
);

export default MemoryMatchPage;
