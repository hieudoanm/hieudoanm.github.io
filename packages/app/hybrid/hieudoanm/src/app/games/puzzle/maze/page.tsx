'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Maze } from '@hieudoanm.github.io/components/pages/games/puzzle/Maze';

const GamesPuzzleMaze = () => {
  return <ToolPage Component={Maze} backPath="/games/puzzle" />;
};
export default GamesPuzzleMaze;
