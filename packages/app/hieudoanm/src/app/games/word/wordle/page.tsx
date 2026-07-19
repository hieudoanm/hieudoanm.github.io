'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Wordle } from '@hieudoanm.github.io/components/pages/games/word/Wordle';

const GamesWordWordle = () => {
  return <ToolPage Component={Wordle} backPath="/games/word" />;
};
export default GamesWordWordle;
