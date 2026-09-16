'use client';

import { CyclicNumber } from '@/games/maths/cyclic';
import { NextPage } from 'next';

const CyclicNumberPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <CyclicNumber />
  </div>
);

export default CyclicNumberPage;
