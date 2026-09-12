'use client';

import { NextPage } from 'next';

import { Nurikabe } from '@/games/nikoli/Nurikabe';

const NurikabePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Nurikabe />
    </div>
  );
};

export default NurikabePage;
