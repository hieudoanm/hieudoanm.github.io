'use client';

import { Heyawake } from '@/games/Heyawake';
import { NextPage } from 'next';

const HeyawakePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Heyawake />
    </div>
  );
};

export default HeyawakePage;
