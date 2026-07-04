'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { PokedexModal } from '@hieudoanm.github.io/components/pages/games/trivia/PokedexModal';

const GamesTriviaPokedex = () => {
  return <ToolPage Component={PokedexModal} backPath="/games/trivia" />;
};
export default GamesTriviaPokedex;
