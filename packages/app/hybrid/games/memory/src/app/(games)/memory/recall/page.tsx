'use client';

import { Recall } from '@/games/memory/Recall';
import { GameContainer } from '@/components/organisms/GameContainer';
import { MEMORY_GAMES } from '@/games/memory/_shared/games';
import { NextPage } from 'next';

const RELATED_GAMES = MEMORY_GAMES.filter(
  (game) => game.href !== '/memory/recall/'
);

const RecallPage: NextPage = () => (
  <GameContainer
    title="Recall"
    description="Number flash memorization."
    relatedGames={RELATED_GAMES}
    backHref="/memory/">
    <Recall onClose={() => {}} />
  </GameContainer>
);

export default RecallPage;
