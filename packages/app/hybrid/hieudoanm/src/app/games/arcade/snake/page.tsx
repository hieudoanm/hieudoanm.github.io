'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Snake } from '@hieudoanm.github.io/components/pages/games/arcade/Snake';

const GamesArcadeSnake = () => {
  return <ToolPage Component={Snake} backPath="/games/arcade" />;
};
export default GamesArcadeSnake;
