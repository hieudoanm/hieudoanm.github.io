'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Blackjack } from '@hieudoanm.github.io/components/pages/games/casino/Blackjack';

const GamesCasinoBlackjack = () => {
  return <ToolPage Component={Blackjack} backPath="/games/casino" />;
};
export default GamesCasinoBlackjack;
