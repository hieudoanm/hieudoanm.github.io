'use client';

import { LightsOut } from '@/games/puzzles/LightsOut';
import { NextPage } from 'next';

const LightsOutPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <LightsOut onClose={() => {}} />
  </div>
);

export default LightsOutPage;
