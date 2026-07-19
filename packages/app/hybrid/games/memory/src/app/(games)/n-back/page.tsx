'use client';

import { NBack } from '@/games/NBack';
import { NextPage } from 'next';

const NBackPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <NBack onClose={() => {}} />
  </div>
);

export default NBackPage;
