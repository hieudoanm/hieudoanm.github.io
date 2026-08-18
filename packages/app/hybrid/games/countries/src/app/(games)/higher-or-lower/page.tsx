'use client';

import { HigherOrLower } from '@/games/higher-or-lower';
import { NextPage } from 'next';

const HigherOrLowerPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <HigherOrLower />
    </div>
  );
};

export default HigherOrLowerPage;
