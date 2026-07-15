'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Recall } from '@hieudoanm.github.io/components/pages/games/memory/Recall';

const GamesMemoryRecall = () => {
  return <ToolPage Component={Recall} backPath="/games/memory" />;
};
export default GamesMemoryRecall;
