'use client';

import type { FC } from 'react';
import { RockPaperScissors } from '@/games/RockPaperScissors';

const RockPaperScissorsPage: FC = () => (
  <div className="flex flex-1 flex-col">
    <RockPaperScissors />
  </div>
);

export default RockPaperScissorsPage;
