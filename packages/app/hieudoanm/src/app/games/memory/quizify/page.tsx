'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { QuizifyModal } from '@hieudoanm.github.io/components/pages/games/memory/QuizifyModal';

const GamesMemoryQuizify = () => {
  return <ToolPage Component={QuizifyModal} backPath="/games/memory" />;
};
export default GamesMemoryQuizify;
