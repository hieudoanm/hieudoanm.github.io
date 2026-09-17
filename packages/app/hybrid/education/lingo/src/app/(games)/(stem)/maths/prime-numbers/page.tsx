'use client';

import { PrimeNumbers } from '@/games/stem/maths/prime-numbers';
import { NextPage } from 'next';

const PrimeNumbersPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <PrimeNumbers />
  </div>
);

export default PrimeNumbersPage;
