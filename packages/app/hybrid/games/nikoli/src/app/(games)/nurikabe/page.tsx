'use client';

import { Nurikabe } from '@/games/Nurikabe';
import { NextPage } from 'next';
import Link from 'next/link';

const NurikabePage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Nurikabe />
    </div>
  );
};

export default NurikabePage;
