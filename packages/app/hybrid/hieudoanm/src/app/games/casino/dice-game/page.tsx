'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { DiceGame } from '@hieudoanm.github.io/components/pages/games/casino/DiceGame';

const GamesCasinoDiceGame = () => {
  return <ToolPage Component={DiceGame} backPath="/games/casino" />;
};
export default GamesCasinoDiceGame;
