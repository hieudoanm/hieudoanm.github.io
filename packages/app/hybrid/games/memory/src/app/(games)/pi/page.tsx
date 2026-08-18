'use client';

import { Pi } from '@/games/PiNumber';
import { NextPage } from 'next';

const PiPage: NextPage = () => (
  <div className="flex h-full flex-col">
    <Pi onClose={() => {}} />
  </div>
);

export default PiPage;
