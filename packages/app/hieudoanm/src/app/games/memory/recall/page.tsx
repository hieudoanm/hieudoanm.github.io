'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { RecallModal } from '@hieudoanm.github.io/components/pages/games/memory/RecallModal';

const GamesMemoryRecall = () => {
  return <ToolPage Component={RecallModal} backPath="/games/memory" />;
};
export default GamesMemoryRecall;
