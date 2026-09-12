'use client';

import { NextPage } from 'next';

import { Heyawake } from '@/games/nikoli/Heyawake';

const HeyawakePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Heyawake />
    </div>
  );
};

export default HeyawakePage;
