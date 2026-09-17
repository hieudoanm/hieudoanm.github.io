'use client';

import { Chemistry } from '@/games/stem/chemistry/periodic-table';
import { NextPage } from 'next';

const ChemistryPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <Chemistry />
  </div>
);

export default ChemistryPage;
