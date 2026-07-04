'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { PiModal } from '@hieudoanm.github.io/components/pages/games/memory/PiNumberModal';

const GamesMemoryPi = () => {
  return <ToolPage Component={PiModal} backPath="/games/memory" />;
};
export default GamesMemoryPi;
