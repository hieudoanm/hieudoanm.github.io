'use client';

import Link from 'next/link';
import { Norinori } from '@/games/Norinori';
import { NextPage } from 'next';

const NorinoriPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Norinori />
    </div>
  );
};

export default NorinoriPage;
