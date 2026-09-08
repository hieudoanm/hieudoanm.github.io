'use client';

import { Pitch } from '@/games/pitch';
import { NextPage } from 'next';

const PitchPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <Pitch />
  </div>
);

export default PitchPage;
