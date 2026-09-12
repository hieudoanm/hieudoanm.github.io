'use client';

import { NextPage } from 'next';

import { Norinori } from '@/games/nikoli/Norinori';

const NorinoriPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Norinori />
    </div>
  );
};

export default NorinoriPage;
