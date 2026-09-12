'use client';

import { NextPage } from 'next';

import { Masyu } from '@/games/nikoli/Masyu';

const MasyuPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Masyu />
    </div>
  );
};

export default MasyuPage;
