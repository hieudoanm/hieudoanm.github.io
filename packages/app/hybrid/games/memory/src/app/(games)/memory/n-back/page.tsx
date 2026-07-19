'use client';

import { NBack } from '@/games/memory/NBack';
import { GameContainer } from '@/components/organisms/GameContainer';
import { MEMORY_GAMES } from '@/games/memory/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = MEMORY_GAMES.filter(
  (game) => game.href !== '/memory/n-back/'
);

const NBackPage: NextPage = () => (
  <GameContainer
    title="N-Back"
    description="Spatial n-back cognitive test."
    relatedGames={RELATED_GAMES}
    backHref="/memory/">
    <NBack onClose={() => {}} />
  </GameContainer>
);

export default NBackPage;
