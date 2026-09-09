'use client';

import { Music } from '@/games/music';
import { NextPage } from 'next';

const MusicPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <Music />
  </div>
);

export default MusicPage;
