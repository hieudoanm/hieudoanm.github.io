'use client';

import { Connections } from '@/games/geography/nyt-connections';
import { NextPage } from 'next';

const ConnectionsPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Connections />
    </div>
  );
};

export default ConnectionsPage;
