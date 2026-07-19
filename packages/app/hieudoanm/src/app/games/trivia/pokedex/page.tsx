'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Pokedex } from '@hieudoanm.github.io/components/pages/games/trivia/Pokedex';

const GamesTriviaPokedex = () => {
  return <ToolPage Component={Pokedex} backPath="/games/trivia" />;
};
export default GamesTriviaPokedex;
