'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { RockPaperScissors } from '@hieudoanm.github.io/components/pages/games/arcade/RockPaperScissors';

const GamesArcadeRps = () => {
  return <ToolPage Component={RockPaperScissors} backPath="/games/arcade" />;
};
export default GamesArcadeRps;
