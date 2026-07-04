'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { WordleModal } from '@hieudoanm.github.io/components/pages/games/word/WordleModal';

const GamesWordWordle = () => {
  return <ToolPage Component={WordleModal} backPath="/games/word" />;
};
export default GamesWordWordle;
