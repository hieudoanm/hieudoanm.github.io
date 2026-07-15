'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Quizify } from '@hieudoanm.github.io/components/pages/games/memory/Quizify';

const GamesMemoryQuizify = () => {
  return <ToolPage Component={Quizify} backPath="/games/memory" />;
};
export default GamesMemoryQuizify;
