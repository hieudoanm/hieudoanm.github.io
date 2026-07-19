'use client';

import { FibonacciSequence } from '@/games/stem/maths/fibonacci-sequence';
import { NextPage } from 'next';

const FibonacciSequencePage: NextPage = () => (
  <div className="p-4 md:p-6">
    <FibonacciSequence />
  </div>
);

export default FibonacciSequencePage;
