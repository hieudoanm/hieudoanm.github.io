'use client';

import { FlagGuesser } from '@/games/flag-guesser';
import { NextPage } from 'next';

const FlagGuesserPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <FlagGuesser />
    </div>
  );
};

export default FlagGuesserPage;
