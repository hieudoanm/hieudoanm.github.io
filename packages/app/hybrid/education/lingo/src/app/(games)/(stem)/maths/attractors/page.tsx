'use client';

import { Attractors } from '@/games/maths/attractors';
import { NextPage } from 'next';

const AttractorsPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <Attractors />
  </div>
);

export default AttractorsPage;
